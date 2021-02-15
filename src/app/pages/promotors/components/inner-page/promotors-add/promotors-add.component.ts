import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/global/global-config';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';
import { ImageCropperDialogComponent } from 'src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';
import { PromotorsService } from '../../service/promotors.service';
import { Buffer } from 'buffer';

import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeComponent,
  OwlDateTimeFormats,
} from 'ng-pick-datetime';
// import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { NgSelectConfig } from '@ng-select/ng-select';
import { NewUsersPromotorsDialogComponent } from '../newuserpromotor-dialog/newuserspromotor-dialog.component';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: 'YYYY',
  fullPickerInput: 'l LT',
  datePickerInput: 'YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'YYYY',
};

declare var AWS: any;
declare var google: any;

@Component({
  selector: 'app-promotors-add',
  templateUrl: './promotors-add.component.html',
  styleUrls: ['./promotors-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class PromotorsAddComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: PromotorsService,
    private router: Router,
    private conf: Configuration,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService
  ) {
    this.configSelect.notFoundText = 'No currency found!';
  }

  get f() {
    return this.addForm.controls;
  }
  minValue = 20;
  maxValue = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  submitted = false;
  addForm: FormGroup;
  assetId: any;
  statusCode: any;
  formObj = {
    userId: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),

    // address fields
    addressName: new FormControl('', [Validators.required]),
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  };
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  listGroup = [];

  editAssetId: any;
  editSubId: any;
  editSubSubId: any;

  langSelectors = [];
  listLang: any;
  imagesUrl = [];
  isLoading = false;
  imgErrMsg: any;
  addressData: any;
  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  testDate: any;
  private index = 0;

  maxDate = moment(new Date()).format('YYYY-MM-DD');

  listUsers: any;

  currencies = [];

  seqIds = 1;

  googleAddress: any;

  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(
      msg || 'failed!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.statusCode = params.sCode;
      this.assetId = params.id;
    });

    // breadcrumb update
    if (this.assetId !== '1') {
      // this.getAssetList();
      this.getAllAsset();
    } else {
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    }

    this.getUserList();
    this.reasonaddForm();
    // this.getAllAsset();
    this.languageActive();
    this.getCurrencyList();
  }
  getUserList() {
    const list = {
      query: '',
      trigger: 1,
    };
    this.service.userGetList(list).subscribe(
      (res: any) => {
        // console.log('users/search', res);
        res.data.map(x => {
          x.contentTitle =
            x.firstName +
            ' ' +
            x.lastName +
            '(' +
            x.email +
            ',' +
            x.phoneNumber +
            ')';
        });
        this.listUsers = res.data;
        console.log('this.listUsers', this.listUsers);
      },
      error => {
        console.log(error);
      }
    );
  }
  // get currency list start
  getCurrencyList() {
    this.service.getCurrencyList().subscribe(
      (res: any) => {
        this.currencies = res.data;
        console.log(res.data);
        const currencyArray = [];
        this.currencies.map((data, index) => {
          currencyArray.push({
            id: index,
            name: data.code + ' - ' + data.symbol,
          });
        });
        this.currencies = currencyArray;
      },
      error => {
        console.log(error);
      }
    );
  }
  // get currency list end

  // change currency
  selectCurrency(event) {
    console.log('select currency', event);
    // this.eventValue = event == 5?true:false;
    // let list = {
    //   id : 1,
    //   trigger:event
    // }
    // if(event < 5){
    //  this.getAllPromotors(list);
    // }
  }

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        console.log('assetType', res);
        this.listAsset = res.data;
        // console.log(this.listGroup)
        this.addForm.controls.assetTypeId.setValidators(Validators.required);
        this.addForm.controls.assetTypeId.updateValueAndValidity();
        if (this.assetId !== '1') {
          this.getAssetList();
        } else {
          const breadcrumb = { AddtagT: 'Add' };
          this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
        }
      },
      error => {
        console.log(error);
        if (error.status === 499) {
          this.conf.clear();
          this.router.navigate(['']);
        }
      }
    );
  }

  getAssetList() {
    const list = {
      statusCode: this.statusCode,
      assetId: this.assetId,
    };
    this.service.assetGetList(list).subscribe(
      (res: any) => {
        console.log('asset - get', res);
        res.data[0].details.map(x => {
          x.attributes.map(y => {
            if (y.typeCode === 12) {
              // console.log(y)
              const ctrlValue = moment();
              ctrlValue.year(y.value_12);
              y.values_12 = ctrlValue;
            }
          });
        });
        const getAsset = res.data[0];
        this.reOrderGroup(getAsset.details);
        const userIndex =
          this.listUsers &&
          this.listUsers.findIndex(x => x._id === getAsset.userId);
        if (userIndex > -1) {
          this.addForm.controls.userId.setValue(this.listUsers[userIndex]);
        }
        // console.log('userIndex', userIndex)
        this.imagesUrl = getAsset.images ? getAsset.images : [];
        this.addForm.controls.title.setValue(getAsset.title.en);
        this.addForm.controls.currency.setValue(getAsset.currency);
        this.addForm.controls.price.setValue(getAsset.price);
        this.addForm.controls.marketplace.setValue(
          getAsset.marketPlaceStatusCode === 1 ? true : false
        );
        this.editAssetId = getAsset.assetTypeId || undefined;
        this.editSubId = getAsset.assetSubtypeId || undefined;
        this.editSubSubId = getAsset.assetSubSubTypeId || undefined;
        const index = this.listAsset.findIndex(
          x => x._id === getAsset.assetTypeId
        );
        if (index > -1) {
          this.addForm.controls.assetTypeId.setValue(this.listAsset[index]);
          this.addForm.controls.assetTypeId.disable();
          if (this.listAsset[index].hasSubType) {
            this.getAsset(this.listAsset[index]);
          }
        }
        const breadcrumb = { AddtagT: 'Edit (' + getAsset.title.en + ')' };
        this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
      },
      error => {
        console.log(error);
      }
    );
  }

  languageActive() {
    this.service.languageActive().subscribe(
      (res: any) => {
        console.log('language', res);
        this.listLang = res.result;
        this.listLang.map(x => {
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getAsset(data) {
    this.listGroup = this.assetId === '1' ? [] : this.listGroup;
    if (data.hasSubType) {
      const list = {
        assetSubtype: data._id,
      };
      this.service.assetSubList(list).subscribe(
        (res: any) => {
          console.log('assetSubtype', res);
          this.listSubAsset = res.data;
          this.listSubSubAsset = [];
          this.addForm.controls.assetSubtypeId.setValidators(
            Validators.required
          );
          this.addForm.controls.assetSubtypeId.updateValueAndValidity();
          if (this.assetId !== '1') {
            const indexSub = this.listSubAsset.findIndex(
              x => x._id === this.editSubId
            );
            if (indexSub > -1) {
              this.addForm.controls.assetSubtypeId.setValue(
                this.listSubAsset[indexSub]
              );
              this.addForm.controls.assetSubtypeId.disable();
              if (this.listSubAsset[indexSub].hasSubType) {
                this.getSubAsset(this.listSubAsset[indexSub]);
              }
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.listSubAsset = [];
      this.listSubSubAsset = [];
      this.groupsList(data);
      this.addForm.controls.assetSubtypeId.setValidators(null);
      this.addForm.controls.assetSubtypeId.updateValueAndValidity();
      this.addForm.controls.assetSubtypeId.setValue('');
    }

    this.addForm.controls.assetSubSubTypeId.setValidators(null);
    this.addForm.controls.assetSubSubTypeId.updateValueAndValidity();
    this.addForm.controls.assetSubSubTypeId.setValue('');
  }

  getSubAsset(data) {
    this.listGroup = this.assetId === '1' ? [] : this.listGroup;
    if (data.hasSubType) {
      const list = {
        assetSubSubtype: data._id,
      };
      this.service.assetSubSubList(list).subscribe(
        (res: any) => {
          console.log('assetSubSubtype', res);
          this.listSubSubAsset = res.data;
          this.addForm.controls.assetSubSubTypeId.setValidators(
            Validators.required
          );
          this.addForm.controls.assetSubSubTypeId.updateValueAndValidity();
          if (this.assetId !== '1') {
            const indexSub = this.listSubSubAsset.findIndex(
              x => x._id === this.editSubSubId
            );
            if (indexSub > -1) {
              this.addForm.controls.assetSubSubTypeId.setValue(
                this.listSubSubAsset[indexSub]
              );
              this.addForm.controls.assetSubSubTypeId.disable();
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.listSubSubAsset = [];
      this.groupsList(data);
      this.addForm.controls.assetSubSubTypeId.setValidators(null);
      this.addForm.controls.assetSubSubTypeId.updateValueAndValidity();
      this.addForm.controls.assetSubSubTypeId.setValue('');
    }
  }

  getSubSubAsset(data) {
    this.listGroup = [];
    this.groupsList(data);
  }

  groupsList(data) {
    let ids = [];
    if (data.attributesGroups && data.attributesGroups.length > 0) {
      data.attributesGroups.map(x => {
        ids = [...ids, ...x];
      });
      const list = {
        attributesGroupIds: ids,
      };

      this.service.atrributeGroupList(list).subscribe(
        (res: any) => {
          // this.listGroup = res.data;
          this.reOrderGroup(res.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  reOrderGroup(data) {
    data.sort((a, b) => a.seqId - b.seqId);
    data.map(x => {
      x.attributes.sort((a, b) => a.seqId - b.seqId);
    });
    this.listGroup = data;
  }

  reasonaddForm() {
    this.formObj.userId = new FormControl('', [Validators.required]);
    this.formObj.pin = new FormControl('', [Validators.required]);
    this.formObj.dob = new FormControl('', [Validators.required]);

    // address fields
    this.formObj.addressName = new FormControl('', [Validators.required]);
    this.formObj.line1 = new FormControl('', [Validators.required]);
    this.formObj.line2 = new FormControl('', [Validators.required]);
    this.formObj.area = new FormControl('', [Validators.required]);
    this.formObj.city = new FormControl('', [Validators.required]);
    this.formObj.state = new FormControl('', [Validators.required]);
    this.formObj.postalCode = new FormControl('', [Validators.required]);
    this.formObj.country = new FormControl('', [Validators.required]);

    this.addForm = this.formBuilder.group(this.formObj);
  }

  getUsers(data: any) {
    // let address = {};
    // console.log('this.googleAddress', this.googleAddress);
    // this.googleAddress.address_components && this.googleAddress.address_components.map((address, index) => {
    // address = {
    // address['line1'] = this.googleAddress.address_components[0] ? this.googleAddress.address_components[0].long_name : '';
    // address['line2'] = this.googleAddress.address_components[1] ? this.googleAddress.address_components[1].long_name : '';
    // address['Area'] = this.googleAddress.address_components[2] ? this.googleAddress.address_components[2].long_name : '';
    // address['City'] = this.googleAddress.address_components[3] ? this.googleAddress.address_components[3].long_name : '';
    // address['state'] = this.googleAddress.address_components[5] ? this.googleAddress.address_components[5].long_name : '';
    // address['postCode'] = this.googleAddress.address_components[5] ? this.googleAddress.address_components[7].long_name : '';
    // address['Country'] = this.googleAddress.address_components[6] ? this.googleAddress.address_components[6].long_name : '';
    // }
    // })
    // address['addressName'] = this.googleAddress.name ? this.googleAddress.name: "",

    // console.log('address', address);

    console.log('form submit data', data);
    this.submitted = true;

    const list = {
      promoterId: data.userId._id,
      Pin: data.pin ? data.pin.toString() : '',
      Address: {
        addressName: data.addressName,
        Country: data.country,
        postCode: data.postalCode ? data.postalCode.toString() : '',
        state: data.state,
        City: data.city,
        Area: data.area,
        line2: data.line2,
        line1: data.line1,
      },
      dateOfBirth: data.dob,
    };

    console.log('form submit list', list);

    // const invalid = [];
    // const controls = this.addForm.controls;
    // console.log('this.addForm.controls', this.addForm.controls)
    // for (const name in controls) {
    //     if (controls[name].invalid) {
    //         invalid.push(name);
    //     }
    // }
    console.log('this.addForm.invalid', this.addForm);
    if (this.addForm.invalid) {
      this.showToast(
        'top-right',
        'Please fill the mandatory fields!',
        'danger'
      );
      return;
    } else {
      this.service.postPromotorList(list, this.assetId).subscribe(
        (res: any) => {
          this.location.back();
          this.showToast(
            'top-right',
            'Promoter added successfully!',
            'success'
          );
          console.log('promotor post response', res);
          // this.listGroup = res.data;
        },
        error => {
          console.log(error);
          this.showToast('top-right', error.error.message, 'danger');
          console.log(error.error.message);
        }
      );
    }
  }

  onRangeChange(changeContext: ChangeContext, i, j): void {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    this.listGroup[i].attributes[j]['value_' + typeCode] = {
      min: changeContext.value,
      max: changeContext.highValue,
    };
    this.listGroup[i].attributes[j].checked = true;
  }

  groupTextList(event, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    if (event.target.value.length > 0) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = event.target.value;
      this.listGroup[i].attributes[j].checked = true;
    } else {
      this.listGroup[i].attributes[j].checked = false;
    }
  }

  groupCheckBox(event, value, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    if (!this.listGroup[i].attributes[j]['value_' + typeCode]) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = [];
    }
    const index = this.listGroup[i].attributes[j][
      'value_' + typeCode
    ].findIndex(x => x === value);
    if (index > -1) {
      this.listGroup[i].attributes[j]['value_' + typeCode].splice(index, 1);
    }
    if (event.target.checked) {
      this.listGroup[i].attributes[j]['value_' + typeCode].push(value);
    }
    this.listGroup[i].attributes[j].checked =
      this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
        ? true
        : false;
  }

  plusMinus(event: number, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    if (!this.listGroup[i].attributes[j]['value_' + typeCode]) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = 1;
    }
    const count = this.listGroup[i].attributes[j]['value_' + typeCode];
    const value = Math.min(Math.max(1, count + event));
    this.listGroup[i].attributes[j]['value_' + typeCode] = value;
    this.listGroup[i].attributes[j].checked = true;
  }

  groupChangeSelect(event, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    this.listGroup[i].attributes[j]['value_' + typeCode] = event;
    this.listGroup[i].attributes[j].checked = true;
  }

  videoChangeEvent(e, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    if (!this.listGroup[i].attributes[j]['value_' + typeCode]) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = [];
    }
    this.listGroup[i].attributes[j].isLoading = true;
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    const fileChooser = e.srcElement;
    const file = fileChooser.files[0];
    const dt = moment().valueOf();
    if (file) {
      const params = {
        Key: 'video_' + dt,
        ContentType: file.type,
        Body: file,
      };
      bucket.upload(params, (err, data) => {
        this.listGroup[i].attributes[j]['value_' + typeCode].push({
          videoLink: data.Location,
          seqId:
            this.listGroup[i].attributes[j]['value_' + typeCode].length + 1,
        });
        this.listGroup[i].attributes[j].checked =
          this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
            ? true
            : false;
        this.listGroup[i].attributes[j].isLoading = false;
      });
    }
    return false;
  }

  removeImg(i, j, k) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j]['value_' + typeCode].splice(k, 1);
    this.listGroup[i].attributes[j].checked =
      this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
        ? true
        : false;
  }

  fileChangeEvent(event: any, i, j): void {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    if (!this.listGroup[i].attributes[j]['value_' + typeCode]) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = [];
    }
    this.openDialog(event, i, j);
  }

  chosenYearHandler(
    normalizedYear: Moment,
    datepicker: OwlDateTimeComponent<Moment>,
    i,
    j
  ) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    this.listGroup[i].attributes[j][
      'value_' + typeCode
    ] = normalizedYear.year();
    this.listGroup[i].attributes[j]['values_' + typeCode] = ctrlValue;
    this.listGroup[i].attributes[j].checked = true;
    datepicker.close();
  }

  openDialog(data, i, j) {
    this.dialogService
      .open(ImageCropperDialogComponent, {
        context: {
          action: false,
          title: 'Cropper Image',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res);
        if (res) {
          this.uploadFile(res, i, j);
        }
      });
  }

  uploadFile(e, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].isLoading = true;
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    const buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const dt = moment().valueOf();
    if (buf) {
      const params = {
        Key: 'profile_' + dt + '.jpg',
        ContentType: 'image/jpeg',
        Body: buf,
      };
      bucket.upload(params, (err, data) => {
        // console.log(data);
        this.listGroup[i].attributes[j]['value_' + typeCode].push({
          imageLink: data.Location,
          seqId:
            this.listGroup[i].attributes[j]['value_' + typeCode].length + 1,
        });
        this.listGroup[i].attributes[j].isLoading = false;
        this.listGroup[i].attributes[j].checked =
          this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
            ? true
            : false;
      });
    }
    return false;
  }

  openDialogs(data) {
    this.imgErrMsg = false;
    this.dialogService
      .open(ImageCropperDialogComponent, {
        context: {
          action: false,
          title: 'Cropper Image',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res);
        if (res) {
          this.uploadFiles(res);
        }
      });
  }
  seqId() {
    return this.seqIds++;
  }

  uploadFiles(e) {
    this.isLoading = true;
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    const dt = moment().valueOf();
    const buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    let fileName;
    if (this.addForm.controls.title.value) {
      fileName = this.addForm.controls.title.value;
    } else {
      fileName = 'promotor';
    }
    if (buf) {
      const params = {
        Key:
          fileName.split(' ').join('-') +
          '_' +
          dt +
          '_' +
          this.seqId() +
          '.jpg',
        ContentType: 'image/jpeg',
        Body: buf,
      };
      bucket.upload(params, (err, data) => {
        // console.log(data);
        this.imagesUrl.push({
          imageLink: data.Location,
          seqId: this.imagesUrl.length + 1,
        });
        this.isLoading = false;
      });
    }
    return false;
  }

  removeImgs(k) {
    this.imagesUrl.splice(k, 1);
    (document.getElementById('imageUpload') as HTMLInputElement).value = '';
  }
  locationSearch(event, is?, js?) {
    this.addForm.controls.line1.setValue('');
    this.addForm.controls.line2.setValue('');
    this.addForm.controls.area.setValue('');
    this.addForm.controls.state.setValue('');
    this.addForm.controls.country.setValue('');
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.addForm.controls.addressName.setValue(place.name);
      const placelatlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      // this.lat = place.geometry.location.lat()
      // this.long = place.geometry.location.lng()
      // this.locAddress = place.formatted_address

      console.log('place.address_components===', place.address_components);
      // for (let i = 0; i < place.address_components.length; i++) {
      for (const i of place.address_components) {
        // for (let j = 0; j < i.types.length; j++) {
        for (const j of i.types) {
          if (j === 'country') {
            this.addForm.controls.country.setValue(i.long_name);
          }
          if (j === 'administrative_area_level_1') {
            this.addForm.controls.state.setValue(i.long_name);
          }

          if (j === 'sublocality_level_2') {
            this.addressData = i.long_name;
            this.addForm.controls.line2.setValue(this.addressData);
          }
          if (j === 'locality') {
            this.addForm.controls.city.setValue(i.long_name);
          }
          if (j === 'postal_code') {
            this.addForm.controls.postalCode.setValue(i.long_name);
          }
          if (j === 'route') {
            this.addForm.controls.line1.setValue(i.long_name);
          }
          // if (j === 'sublocality_level_2') {
          //   this.addForm.controls.line2.setValue(fulladdress)
          //   // const address1 = i.long_name
          //   // console.log(this.addressData)
          //   // console.log(address1)
          //   // if (this.addressData) {
          //   //   fulladdress = this.addressData
          //   // }
          //   // if (address1) {
          //   //   if (fulladdress) {
          //   //     fulladdress += ', ' + address1
          //   //   } else {
          //   //     fulladdress += address1
          //   //   }
          //   // }
          //   // this.addForm.controls.line2.setValue(fulladdress)
          // }
          if (j === 'sublocality_level_1') {
            this.addForm.controls.area.setValue(i.long_name);
          }
        }
      }
    });
  }

  // create new user dialog
  openNewUserDialog() {
    this.dialogService
      .open(NewUsersPromotorsDialogComponent, {
        context: {
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.getUserList();
          console.log('new user dialog result', res);
        }
      });
  }
  dobChange(e) {
    const today = new Date();
    const birthDate = new Date(e);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    console.log(today);
    console.log(birthDate);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age >= 18) {
    } else {
      this.addForm.controls.dob.setValue('');
      this.showToast(
        'top-right',
        'Date of Birth shoud be more than 18 Years !',
        'danger'
      );
    }
  }
  /**
   * @author  bhavesh jain
   * @param * e
   * @description get dob on user change and show the dob field
   */
  getDob(e) {
    console.log(e);
    const arr = Object.keys(e).map(k => e[k]);
    const src = '_source';
    const dobrth = 'dateOfBirth';
    console.log(arr[0][dobrth]);
    if (arr[0][dobrth]) {
      const momentDOB = moment(arr[0][dobrth]).format('DD-MM-YYYY');
      this.addForm.controls.dob.setValue(momentDOB);
    } else {
      this.addForm.controls.dob.setValue('');
    }
  }
}
