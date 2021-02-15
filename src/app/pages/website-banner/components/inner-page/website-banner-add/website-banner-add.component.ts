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
import { WebsiteBannerService } from '../../service/website-banner.service';
import { Buffer } from 'buffer';

import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeComponent,
  OwlDateTimeFormats,
} from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { NgSelectConfig } from '@ng-select/ng-select';

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
  selector: 'app-website-banner-add',
  templateUrl: './website-banner-add.component.html',
  styleUrls: ['./website-banner-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class BannerAddComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: WebsiteBannerService,
    private router: Router,
    private conf: Configuration,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService
  ) {
    this.configSelect.notFoundText = 'No Ratings found!';
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
    linkedwith: new FormControl(),
    userads: new FormControl(),
    users: new FormControl(),
    enterurl: new FormControl(),
    assetTypeId: new FormControl(),
    assetSubtypeId: new FormControl(),
    assetSubSubTypeId: new FormControl(),
  };
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  taxPercentageVal: any;
  taxesPercen = [];

  listGroup = [];

  editAssetId: any;
  editSubId: any;
  editSubSubId: any;

  langSelectors = [];
  listPlanType = [];
  listLang: any;
  imagesUrl: any;
  facebookImagesUrl: any;
  facebookIsLoading = false;
  linkurl = false;
  usersActiveAds = false;
  usersName = false;
  assetTypeUi = false;
  assetSubTypeUi = false;
  assetSubSubTypeUi = false;
  isLoading = false;

  imgErrMsg: any;

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  assetConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  private index = 0;

  // location variables
  lat: any;
  long: any;
  locAddress: any;

  listUsers: any;
  listUsersAds: any;
  currencies = [];
  // get currency list end

  unitsList = [];

  currencySymbol: any;
  unitsSymbol: any;

  curWithVal = '1234';

  limit = 50;

  seqIds = 1;

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
      this.statusCode = params.sCode;
      this.assetId = params.id;
      this.reasonaddForm();
      this.getCurrencyList();
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
    this.listPlanType = [
      { id: 1, name: 'User Ad' },
      { id: 5, name: 'Link' },
      { id: 2, name: 'Asset Type' },
      { id: 3, name: 'Asset Sub Type' },
      { id: 4, name: 'Asset Sub Sub Type' },
    ];

    // this.reasonaddForm();
    this.linkurl = true;
    this.assetTypeUi = true;
    this.assetSubTypeUi = true;
    this.assetSubSubTypeUi = true;
    this.usersActiveAds = true;
    this.usersName = true;
    // this.languageActive();
    // this.getCurrencyList();
    // this.getUnitsList();
  }

  numericalType(data) {
    return data.split('-')[1];
  }

  // get currency list start
  getCurrencyList() {
    this.service.getCountryList().subscribe(
      (res: any) => {
        this.currencies = res.data;
        console.log('this.currencies  country/////////', this.currencies);
        const currencyArray = [];
        this.currencies.map((data, index) => {
          currencyArray.push({ id: index, name: data.name });
        });
        this.currencies = currencyArray;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        console.log('assetType', res);
        this.listAsset = res.data;
        // console.log(this.listGroup)
        this.addForm.controls.assetTypeId.setValidators(Validators.required);
        this.addForm.controls.assetTypeId.updateValueAndValidity();
        if (this.assetId !== 1) {
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
        console.log('getAsset', getAsset);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsersAds(e) {
    console.log('eeeeee---> ', e.value._id);
    const list = {
      set: 0,
      limit: this.limit,
      status: 1,
      userId: e.value._id,
    };
    this.service.tagsList(list).subscribe(
      (res: any) => {
        res.result.map(x => {
          x.contentTitle = x.assetTitle;
        });
        this.listUsersAds = res.result;
        console.log('get adds', this.listUsersAds);
      },
      error => {
        console.log(error);
      }
    );
  }

  selectionChanged(e) {
    switch (e.value.id) {
      case 1:
        // User Ad
        this.usersActiveAds = false;
        this.usersName = false;
        this.linkurl = true;
        this.assetTypeUi = true;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;

        const list = {
          trigger: 3,
        };

        this.service.getusers(list).subscribe(
          (res: any) => {
            res.data.map(x => {
              x.contentTitle = x.firstName + ' ' + x.lastName;
            });
            this.listUsers = res.data;
            console.log('users list======>', this.listUsers);
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 2:
        // Asset Type
        this.getAllAsset();
        this.linkurl = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
      case 3:
        // Asset Sub Type
        this.getAllAsset();
        this.linkurl = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = false;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
      case 4:
        // Asset Sub Sub Type
        this.getAllAsset();
        this.linkurl = true;
        this.usersActiveAds = true;
        this.usersName = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = false;
        this.assetSubSubTypeUi = false;
        break;
      case 5:
        // Link
        this.linkurl = false;
        this.assetTypeUi = true;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
    }
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
    this.listGroup = this.assetId === 1 ? [] : this.listGroup;
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
          if (this.assetId !== 1) {
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
    this.listGroup = this.assetId === 1 ? [] : this.listGroup;
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
          if (this.assetId !== 1) {
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

  // reOrderGroup(data){
  //    data.sort((a, b) => a.seqId - b.seqId);
  //    data.map(x=>{
  //      x.attributes.sort((a, b) => a.seqId - b.seqId)
  //    })
  //    this.listGroup = data;
  // }

  reOrderGroup(data) {
    data.sort((a, b) => a.seqId - b.seqId);
    data.map(x => {
      x.attributes.map(att => {
        att.colorCode = 0;
      });
      x.attributes.sort((a, b) => a.seqId - b.seqId);
    });
    this.listGroup = data;
  }

  rangeValidation(min, max) {
    this.options.floor = min;
    this.options.ceil = max;
    this.options.step = 1;
  }

  hack(val) {
    return Array.from(val);
  }

  reasonaddForm() {
    this.formObj.linkedwith = new FormControl('', [Validators.required]);
    this.formObj.userads = new FormControl('', [Validators.required]);
    this.formObj.users = new FormControl('', [Validators.required]);
    this.formObj.enterurl = new FormControl('', [Validators.required]);
    this.formObj.assetTypeId = new FormControl('', [Validators.required]);
    this.formObj.assetSubtypeId = new FormControl('', [Validators.required]);
    this.formObj.assetSubSubTypeId = new FormControl('', [Validators.required]);

    this.addForm = this.formBuilder.group(this.formObj);
  }

  taxPercentageId(event) {
    console.log('percentage event ', event);
    this.taxPercentageVal = event;
  }

  submitBannerPost(data: any) {
    console.log('add city data:++++++++++==== ', data);
    this.submitted = true;
    let datalist;
    switch (data.linkedwith.id) {
      case 1:
        // User Ad
        datalist = {
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 1,
          data: {
            name: data.userads.assetTitle,
            id: data.userads.userId,
          },
          assetId: data.userads._id,
        };

        break;
      case 2:
        // Asset Type
        datalist = {
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 2,
          data: {
            name: data.assetTypeId.title,
            id: data.assetTypeId._id,
          },
        };
        break;
      case 3:
        // Asset Sub Type
        datalist = {
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 3,
          data: {
            name: data.assetSubtypeId.title,
            id: data.assetSubtypeId._id,
          },
          assettype: data.assetTypeId._id,
        };
        break;
      case 4:
        // Asset Sub Sub Type
        datalist = {
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 4,
          data: {
            name: data.assetSubSubTypeId.title,
            id: data.assetSubSubTypeId._id,
          },
          assettype: data.assetTypeId._id,
          assetsubtype: data.assetSubtypeId._id,
        };

        break;
      case 5:
        // Link
        datalist = {
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 5,
          data: {},
          url: data.enterurl,
        };

        break;
    }

    this.service.postBanner(datalist).subscribe(
      (res: any) => {
        console.log('postBanner---->', res);
        this.location.back();
        this.showToast('top-right', 'Banner added successfully!', 'success');
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error);
      }
    );
  }

  onRangeChange(changeContext: ChangeContext, i, j, min, max): void {
    // this.options['floor'] = min;
    // this.options['ceil'] = max;
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    this.listGroup[i].attributes[j]['value_' + typeCode] = {
      min: changeContext.value,
      max: changeContext.highValue,
    };
    this.listGroup[i].attributes[j].checked = true;
  }

  // groupTextList(event, i, j) {
  //   const typeCode = this.listGroup[i].attributes[j].typeCode;
  //   this.listGroup[i].attributes[j].errMsg = false;
  //   if (event.target.value.length > 0) {
  //     this.listGroup[i].attributes[j]['value_'+typeCode] = event.target.value;
  //     this.listGroup[i].attributes[j].checked = true;
  //   } else {
  //     this.listGroup[i].attributes[j].checked = false;
  //   }
  // }

  groupTextList(event, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    const keyLength = event.target.value.length;
    if (typeCode !== 9) {
      if (
        keyLength < Number(this.listGroup[i].attributes[j].valueMin.en) ||
        keyLength > Number(this.listGroup[i].attributes[j].valueMax.en)
      ) {
        this.listGroup[i].attributes[j].checked = false;
        this.listGroup[i].attributes[j].colorCode = 1;
      } else {
        this.listGroup[i].attributes[j]['value_' + typeCode] =
          event.target.value;
        this.listGroup[i].attributes[j].checked = true;
        this.listGroup[i].attributes[j].colorCode = 2;
      }
    } else {
      if (
        event.target.value <
          Number(this.listGroup[i].attributes[j].valueMin.en) ||
        event.target.value > Number(this.listGroup[i].attributes[j].valueMax.en)
      ) {
        this.listGroup[i].attributes[j].colorCode = 1;
      } else {
        this.listGroup[i].attributes[j]['value_' + typeCode] =
          event.target.value;
        this.listGroup[i].attributes[j].colorCode = 2;
      }
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

  // fileChangeEvent(event: any, i, j): void {
  //   const typeCode = this.listGroup[i].attributes[j].typeCode
  //   this.listGroup[i].attributes[j].errMsg = false
  //   if (!this.listGroup[i].attributes[j]['value_' + typeCode]) {
  //     this.listGroup[i].attributes[j]['value_' + typeCode] = []
  //   }
  //   this.openDialog(event, i, j)
  // }

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

  // openDialog(data, i, j) {
  //   this.dialogService
  //     .open(ImageCropperDialogComponent, {
  //       context: {
  //         action: false,
  //         title: 'Cropper Image',
  //         content: data,
  //         ok: 'Submit',
  //         cancelT: 'Cancel',
  //       },
  //     })
  //     .onClose.subscribe(res => {
  //       // console.log(res);
  //       if (res) {
  //         this.uploadFile(res, i, j)
  //       }
  //     })
  // }

  // uploadFile(e, i, j) {
  //   const typeCode = this.listGroup[i].attributes[j].typeCode
  //   this.listGroup[i].attributes[j].isLoading = true
  //   const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } })
  //   const buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  //   const dt = moment().valueOf()
  //   if (buf) {
  //     const params = {
  //       Key: 'profile_' + dt + '.jpg',
  //       ContentType: 'image/jpeg',
  //       Body: buf,
  //     }
  //     bucket.upload(params, (err, data) => {
  //       // console.log(data);
  //       this.listGroup[i].attributes[j]['value_' + typeCode].push({
  //         imageLink: data.Location,
  //         seqId:
  //           this.listGroup[i].attributes[j]['value_' + typeCode].length + 1,
  //       })
  //       this.listGroup[i].attributes[j].isLoading = false
  //       this.listGroup[i].attributes[j].checked =
  //         this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
  //           ? true
  //           : false
  //     })
  //   }
  //   return false
  // }

  openDialogs(data, val) {
    this.imgErrMsg = false;
    if (data.target.value) {
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
          if (res) {
            switch (val) {
              case 0:
                this.isLoading = true;
                break;
              case 1:
                this.facebookIsLoading = true;
                break;
            }
            this.uploadFiless(res, val);
          }
        });
    }
  }

  removeImgs(k, val) {
    switch (val) {
      case 0:
        // this.imagesUrl.splice(k, 1);
        (document.getElementById('imageUpload') as HTMLInputElement).value = '';
        break;
      case 1:
        // this.facebookImagesUrl.splice(k, 1);
        (document.getElementById(
          'facebookImageUpload'
        ) as HTMLInputElement).value = '';
        break;
    }
  }

  uploadFiless(image, val) {
    switch (val) {
      case 0:
        this.isLoading = true;
        // this.imagesUrl.push({
        //   imageLink: image,
        // });
        this.imagesUrl = {
          imageLink: image,
        };
        console.log('this.imagesUrl----', this.imagesUrl);
        // this.facebookImagesUrl = image;
        this.isLoading = false;
        break;
      case 1:
        this.facebookIsLoading = true;
        // this.facebookImagesUrl.push({
        //   imageLink: image,
        // });
        this.facebookImagesUrl = {
          imageLink: image,
        };
        console.log('this.facebookImagesUrl------', this.facebookImagesUrl);
        this.facebookIsLoading = false;
        break;
    }
  }

  locationSearch(event, i?, j?) {
    // const typeCode = this.listGroup[i].attributes[j].typeCode;
    // this.listGroup[i].attributes[j].errMsg = false;
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const placelatlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.lat = place.geometry.location.lat();
      this.long = place.geometry.location.lng();
      this.locAddress = place.formatted_address;
      // console.log('-------------', place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng())
      // this.listGroup[i].attributes[j]['value_'+typeCode] = place.formatted_address;
      // this.listGroup[i].attributes[j].latitude =  place.geometry.location.lat();
      // this.listGroup[i].attributes[j].longtitude = place.geometry.location.lng();
      // this.listGroup[i].attributes[j].checked = true;

      // for (var i = 0; i < place.address_components.length; i += 1) {
      //   var addressObj = place.address_components[i];
      //   for (var j = 0; j < addressObj.types.length; j += 1) {
      //     if (addressObj.types[j] === "locality") {
      //       var City = addressObj.long_name;
      //     }
      //     if (addressObj.types[j] === "administrative_area_level_1") {
      //       var state = addressObj.short_name;
      //     }
      //     if (addressObj.types[j] === "country") {
      //       var country = addressObj.long_name;
      //     }
      //   }
      // }
    });
    // if (event.target.value.length == 0) {
    //   this.listGroup[i].attributes[j].checked = false;
    // }
  }
}
