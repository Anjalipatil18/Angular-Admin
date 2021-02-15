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
import { RatingService } from '../../service/rating.service';
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
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['./rating-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class RatingAddComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: RatingService,
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
    title: new FormControl(),
    country: new FormControl(),
  };
  listAsset: any;
  listSubAsset: any;
  taxPercentageVal: any;
  taxesPercen = [];
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

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  private index = 0;

  // location variables
  lat: any;
  long: any;
  locAddress: any;

  listUsers: any;

  currencies = [];
  // get currency list end

  unitsList = [];

  currencySymbol: any;
  unitsSymbol: any;

  curWithVal = '1234';

  limit = 10;

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
    this.getAllTaxes();
    // this.getCountry();
    // this.getUserList();
    // this.reasonaddForm();
    // this.getAllAsset();
    // this.languageActive();
    // this.getCurrencyList();
    // this.getUnitsList();
  }

  getCountry() {
    this.service.getCountryList().subscribe(
      (res: any) => {
        res.data.map(x => {
          x.countryList = x.name;
        });
        this.listUsers = res.data;
        console.log('---------->', this.listUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  numericalType(data) {
    return data.split('-')[1];
  }
  getUserList() {
    const list = {
      query: '',
    };
    this.service.userGetList(list).subscribe(
      (res: any) => {
        // console.log('users/search', res);
        res.data.map(x => {
          x.contentTitle =
            x._source.firstName +
            ' ' +
            x._source.lastName +
            '(' +
            x._source.email +
            ',' +
            x._source.phoneNumber +
            ')';
        });
        this.listUsers = res.data;
      },
      error => {
        console.log(error);
      }
    );
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
  // get units list start
  getUnitsList() {
    this.service.getUnitsList().subscribe(
      (res: any) => {
        this.unitsList = res.data;
        const unitsArray = [];
        this.unitsList.map((data, index) => {
          unitsArray.push({ id: index, name: data.unit + ' - ' + data.name });
        });
        // for(let unit in this.unitsList) {
        //   this.unitsList[unit].map((data, index) => {
        //     unitsArray.push({'id': index, 'name': unit + ' - ' + data});
        //   })
        // }
        this.unitsList = unitsArray;
      },
      error => {
        console.log(error);
      }
    );
  }
  // get units list end

  // change currency
  selectCurrency(event) {
    console.log('select currency', event);
    // this.eventValue = event == 5?true:false;
    // let list = {
    //   id : 1,
    //   trigger:event
    // }
    // if(event < 5){
    //  this.getAllRating(list);
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
        const userIndex =
          this.listUsers &&
          this.listUsers.findIndex(x => x._id === getAsset.userId);
        if (userIndex > -1) {
          this.addForm.controls.userId.setValue(this.listUsers[userIndex]);
        }
        console.log('getAsset', getAsset);
        this.imagesUrl = getAsset.images ? getAsset.images : [];
        this.addForm.controls.title.setValue(getAsset.title.en);
        this.addForm.controls.currency.setValue(getAsset.units);
        this.currencySymbol = getAsset.units
          ? getAsset.units.code + ' - ' + getAsset.units.symbol
          : '';
        // this.addForm.controls['units'].setValue(getAsset.units);
        // this.unitsSymbol = getAsset.units ? getAsset.units.code + ' - ' + getAsset.units.symbol : '';
        this.addForm.controls.location.setValue(getAsset.address);
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
    // this.formObj['userId'] = new FormControl("", [Validators.required]);
    this.formObj.title = new FormControl('', [Validators.required]);
    this.formObj.country = new FormControl('', [Validators.required]);
    // this.formObj['location'] = new FormControl("", [Validators.required]);
    // this.formObj['price'] = new FormControl("", [Validators.required]);
    // this.formObj['marketplace'] = new FormControl(false, [Validators.required]);
    // this.formObj['assetTypeId'] = new FormControl({ value: '', disabled: false });
    // this.formObj['assetSubtypeId'] = new FormControl({ value: '', disabled: false });
    // this.formObj['assetSubSubTypeId'] = new FormControl({ value: '', disabled: false });
    // this.formObj['units'] = new FormControl({ value: '', disabled: false });
    this.addForm = this.formBuilder.group(this.formObj);
  }
  getAllTaxes() {
    const list = {
      limit: this.limit,
      status: 'Active',
    };
    this.service.taxesList(list).subscribe(
      (res: any) => {
        this.taxesPercen = res.data;
        console.log('taxes active ---data', this.taxesPercen);
      },
      error => {
        console.log(error);
      }
    );
  }

  taxPercentageId(event) {
    console.log('percentage event ', event);
    this.taxPercentageVal = event;
  }

  getUsers(data: any) {
    console.log('add city data:++++++++++ ', data);
    // this.submitted = true;
    // let dataVal = false;
    // this.imgErrMsg = this.imagesUrl&&this.imagesUrl.length > 0?false:'image field is required!';
    // this.listGroup.map((x,index)=>{
    //   console.log('xxxxxxxxxxx', x);
    //   x.attributes.map(y=>{
    //     if(y.hasOwnProperty('checked')) {
    //       console.log('yyyyy', y);
    //       if(y.mandatory && !y.checked){
    //         // y.errMsg = y.title.en + " field is required!";
    //         y.errMsg = true;
    //         dataVal =  false;
    //       }
    //     } else {
    //       if(y.mandatory){
    //         // y.errMsg = y.title.en + " field is required!";
    //         y.errMsg = true;
    //         dataVal =  false;
    //       }
    //     }
    //   })
    // })

    // const invalid = [];
    // const controls = this.addForm.controls;
    // for (const name in controls) {
    //     if (controls[name].invalid) {
    //         invalid.push(name);
    //     }
    // }

    // console.log('forms', this.addForm, this.addForm.controls)
    // if (this.addForm.invalid || dataVal) {
    //   this.showToast('top-right', invalid + ' fields are missing!', 'danger');
    //   return;
    // }

    // console.log('data.currency' ,data.currency);
    // let currency = data.currency.name ? data.currency.name.split('-').map(s => s.trim()) : data.currency.split('-').map(s => s.trim());
    // console.log('currency split based on -', data.units);
    // let units;
    // if(data.units) {
    // units = data.units.name ? data.units.name.split('-').map(s => s.trim()) : data.units.split('-').map(s => s.trim());
    // }

    // const list={
    //   title:data.title,
    //   units: {
    //     code: currency[0],
    //     symbol: currency[1]
    //   },
    //   price:data.price,
    //   images:this.imagesUrl,
    //   userId:data.userId._id,
    //   assetTypeId:this.assetId == 1?data.assetTypeId._id:this.editAssetId,
    //   assetSubtypeId:this.assetId == 1?data.assetSubtypeId._id:this.editSubId,
    //   assetSubSubTypeId:this.assetId == 1?data.assetSubSubTypeId._id:this.editSubSubId,
    //   isPrivate:data.marketplace?0:1,
    //   isCreatedByAdmin:1,
    //   marketPlaceStatusCode:data.marketplace?1:0,
    //   details:this.listGroup,
    //   lat: this.lat,
    //   long: this.long,
    //   address: this.locAddress
    // }
    // console.log('list', list)
    // ---------------------------------------------------------------------------------------------------
    console.log('--------- cities', data.title.split(','));
    const list = {
      countryName: data.country.name,
      newCity: data.title.split(','),
      taxes: this.taxPercentageVal,
    };
    this.service.assetPostList(list).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast('top-right', 'City added successfully!', 'success');
      },
      error => {
        console.log(error);
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error.error.message);
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
          // console.log(res);
          if (res) {
            this.uploadFiles(res);
          }
        });
    }
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
    if (this.addForm.controls.country.value) {
      fileName = this.addForm.controls.country.value;
    } else {
      fileName = 'country';
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
