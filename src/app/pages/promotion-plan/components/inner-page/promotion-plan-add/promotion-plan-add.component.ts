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
import { PromotionPlanService } from '../../service/promotion-plan.service';
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
  selector: 'app-promotion-plan-add',
  templateUrl: './promotion-plan-add.component.html',
  styleUrls: ['./promotion-plan-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class PromotionPlanAddComponent implements OnInit {
  minValue = 20;
  maxValue = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: PromotionPlanService,
    private router: Router,
    private conf: Configuration,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService
  ) {
    this.configSelect.notFoundText = 'No currency found!';
  }

  submitted = false;
  addForm: FormGroup;
  assetId: any;
  statusCode: any;
  formObj = {
    // planname: new FormControl(),
    plantype: new FormControl(),
    currencyplan: new FormControl(),
    // location: new FormControl(),
    priceplan: new FormControl(),
    validitydays: new FormControl(),
    validityhours: new FormControl(),
    plancoverage: new FormControl(),
    // description: new FormControl(),
  };
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  errMsg: any;
  listGroup = [];
  userDataVal = false;
  editAssetId: any;
  editSubId: any;
  editSubSubId: any;
  selectedVehicle: any;
  langSelectors = [];
  listLang: any;
  imagesUrl = [];
  facebookImagesUrl = [];
  twitterImagesUrl = [];
  ogImagesUrl = [];
  isLoading = false;
  facebookIsLoading = false;
  twitterIsLoading = false;
  ogIsLoading = false;
  imgErrMsg: any;
  addressData: any;
  brandsModelData: any;

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  taxesConfig = {
    displayKey: 'taxName', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  assetConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  coverageConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  testDate: any;
  private index = 0;

  // location variables
  lat: any;
  long: any;
  city: any;
  state: any;
  country: any;
  addressLine: any;
  postalCode: number;
  locAddress: any;
  hideUrgentListing = false;
  items = [];
  listUsers: any;
  listTaxes: any;
  listPlanType = [];
  listPlanCoverage = [];
  currencies = [];
  validityHoursList = [];
  unitsList = [];
  currencySymbol: any;
  validityHoursNo: any;
  unitsSymbol: any;
  curWithVal = '1234';
  formErrMsg = false;
  urlValidMsg = false;
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
      console.log(params);
      this.statusCode = params.sCode;
      this.assetId = params.id;
    });
    this.languageActive();
    // this.getTaxesList();
    // this.getUserList();
    // this.reasonaddForm();
    this.getCurrencyList();

    this.listPlanType = [
      { name: 'Listing High-light', id: 1 },
      { name: 'Urgent Listing', id: 2 },
    ];
    this.listPlanCoverage = [
      { name: 'City' },
      { name: 'Country' },
      { name: 'State' },
    ];
    for (let i = 0; i < 25; i++) {
      this.validityHoursList.push({ name: i });
    }
  }

  /**
   * @description hiding the plan coverage scope field
   * @date 2020-02-04
   * @param * e is change event
   */
  changePlantype(e) {
    console.log('changePlantype----->', e);
    if (e.value.id === 2) {
      this.hideUrgentListing = true;
    } else {
      this.hideUrgentListing = false;
    }
  }

  validation() {
    this.langSelectors.map(x => {
      console.log('---validation--langSelectors----', x);
    });
  }

  reportCheckbox(event, i, lang) {
    console.log(event, i, lang);
    this.errMsg = false;
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addForm.controls['planname_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['planname_' + lang].updateValueAndValidity();
      this.addForm.controls['description_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['description_' + lang].updateValueAndValidity();
    } else {
      this.addForm.controls['planname_' + lang].setValidators(null);
      this.addForm.controls['description_' + lang].setValidators(null);
      this.addForm.controls['planname_' + lang].updateValueAndValidity();
      this.addForm.controls['description_' + lang].updateValueAndValidity();
      this.addForm.controls['planname_' + lang].setValue('');
      this.addForm.controls['description_' + lang].setValue('');
    }
    this.userDataVal = true;
    // this.validation()
    // console.log('thisadduserform', this.addForm.value);
  }

  getUserList() {
    const list = {
      query: '',
    };
    this.service.userGetList(list).subscribe(
      (res: any) => {
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
        this.getAllAsset();
      },
      error => {
        console.log(error);
      }
    );
  }
  // get units list end

  // get taxes api
  getTaxesList() {
    const list = {
      status: 'Active',
    };
    this.service.taxesGetList(list).subscribe(
      (res: any) => {
        console.log(res.data);
        this.listTaxes = res.data;
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
  selectCurrency(event) {}

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        this.listAsset = res.data;
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

  setTitle(event) {
    this.addForm.controls.titleSeo.setValue(event.target.value);

    let slug = event.target.value;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    this.addForm.controls.slug.setValue('website.lopongo.com/' + slug);
  }
  setDescription(event) {
    this.addForm.controls.description.setValue(event.target.value);
  }

  getAssetList() {
    const list = {
      statusCode: this.statusCode,
      assetId: this.assetId,
    };
    this.service.assetGetList(list).subscribe(
      (res: any) => {
        res.data[0].details.map(x => {
          x.attributes.map(y => {
            if (y.typeCode === 12) {
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
        // if (userIndex > -1) {
        //   this.addForm.controls.userId.setValue(this.listUsers[userIndex]);
        // }
        this.imagesUrl = getAsset.images ? getAsset.images : [];
        if (getAsset.seoSettings) {
          this.addForm.controls.titleSeo.setValue(
            getAsset.seoSettings.titleSeo ? getAsset.seoSettings.titleSeo : ''
          );
          this.addForm.controls.metaTags.setValue(
            getAsset.seoSettings.metaTags
              ? getAsset.seoSettings.metaTags
              : getAsset.seoSettings.metaTags
          );
          this.addForm.controls.slug.setValue(
            getAsset.seoSettings.slug ? getAsset.seoSettings.slug : ''
          );
          this.addForm.controls.description.setValue(
            getAsset.seoSettings.description
              ? getAsset.seoSettings.description
              : ''
          );
          this.addForm.controls.adDescription.setValue(
            getAsset.seoSettings.description
              ? getAsset.seoSettings.description
              : ''
          );
          this.facebookImagesUrl = getAsset.seoSettings.facebookImg
            ? getAsset.seoSettings.facebookImg
            : '';
          this.twitterImagesUrl = getAsset.seoSettings.twitterImg
            ? getAsset.seoSettings.twitterImg
            : '';
          this.ogImagesUrl = getAsset.seoSettings.openGraph
            ? getAsset.seoSettings.openGraph
            : '';
        }
        this.addForm.controls.title.setValue(getAsset.title.en);
        this.addForm.controls.currency.setValue(getAsset.units);
        this.currencySymbol = getAsset.units
          ? getAsset.units.code + ' - ' + getAsset.units.symbol
          : '';
        // this.addForm.controls.location.setValue(getAsset.location.name);
        this.addForm.controls.addressLine.setValue(getAsset.address);
        this.addForm.controls.city.setValue(getAsset.city);
        this.addForm.controls.country.setValue(getAsset.country);
        this.addForm.controls.state.setValue(getAsset.state);
        this.addForm.controls.postalCode.setValue(getAsset.zip);
        this.addForm.controls.priceplan.setValue(getAsset.price);
        // this.addForm.controls.marketplace.setValue(
        //   getAsset.marketPlaceStatusCode === 1 ? true : false
        // )
        // this.addForm.controls.sold.setValue(
        //   getAsset.soldStatusCode === 1 ? true : false
        // )
        this.addForm.controls.negotiable.setValue(
          getAsset.isNegotiable === 1 ? true : false
        );
        this.addForm.controls.exchange.setValue(
          getAsset.availableForExchange === 1 ? true : false
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

  reasonaddForm() {
    this.formObj.plantype = new FormControl('', [Validators.required]);
    this.formObj.currencyplan = new FormControl('');
    this.formObj.validitydays = new FormControl('', [Validators.required]);
    this.formObj.priceplan = new FormControl('', [Validators.required]);
    this.formObj.validityhours = new FormControl('', [Validators.required]);
    this.formObj.plancoverage = new FormControl(false, [Validators.required]);
    this.addForm = this.formBuilder.group(this.formObj);
  }

  languageActive() {
    this.service.languageActive().subscribe(
      (res: any) => {
        this.listLang = res.result;
        this.listLang.map(x => {
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });

          this.formObj['planname_' + [x.languageCode]] = new FormControl('');
          this.formObj['description_' + [x.languageCode]] = new FormControl('');
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addForm.controls[
            'planname_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'planname_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
          this.addForm.controls[
            'description_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'description_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }
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
          console.log('resres', res);
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
    console.log('asdasdadadadadadadadadadadaada aeadada dadad ada', data);
    this.listGroup = this.assetId === '1' ? [] : this.listGroup;
    if (data.hasSubType) {
      const list = {
        assetSubSubtype: data._id,
      };
      this.service.assetSubSubList(list).subscribe(
        (res: any) => {
          console.log('asdasdasdadadsa');
          this.listSubSubAsset = res.data;
          console.log('this.listSubSubAsset', this.listSubSubAsset);
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
          console.log('asdasd', res);
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
      x.attributes.map(att => {
        att.colorCode = 0;
        att.validUrl = 0;
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

  get f() {
    return this.addForm.controls;
  }

  addPostPromotionPlan(data: any) {
    console.log('addPostPromotionPlan', data);
    const langNameplanName = {};
    const langNameDescription = {};
    // for(let i=0; i<this.langSelectors.length; i++){
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNameplanName[i.languageCode] = data['planname_' + i.languageCode];
        langNameDescription[i.languageCode] =
          data['description_' + i.languageCode];
      }
    }

    // this.submitted = true;
    const list = {
      name: langNameplanName,
      type: data.plantype.name,
      currency: data.currencyplan.name,
      amount: data.priceplan,
      validity: {
        days: data.validitydays,
        hours: data.validityhours.name,
      },
      coverageScope: data.plancoverage.name,
      description: langNameDescription,
    };

    this.service.addPostPromotion(list).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast('top-right', 'Plan added successfully!', 'success');
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error.error.message);
      }
    );
  }

  onRangeChange(changeContext: ChangeContext, i, j, min, max): void {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    this.listGroup[i].attributes[j]['value_' + typeCode] = {
      min: changeContext.value,
      max: changeContext.highValue,
    };
    this.listGroup[i].attributes[j].checked = true;
  }

  groupTextList(event, i, j) {
    console.log(this.listGroup);
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    const keyLength = event.target.value.length;
    if (typeCode === 16) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = event.target.value;
    }
    if (
      typeCode !== 9 &&
      typeCode !== 17 &&
      typeCode !== 16 &&
      typeCode !== 10 &&
      typeCode !== 11
    ) {
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
        typeCode !== 17 &&
        typeCode !== 16 &&
        typeCode !== 10 &&
        typeCode !== 11
      ) {
        if (
          event.target.value <
            Number(this.listGroup[i].attributes[j].valueMin.en) ||
          event.target.value >
            Number(this.listGroup[i].attributes[j].valueMax.en)
        ) {
          this.listGroup[i].attributes[j].colorCode = 1;
        } else {
          this.listGroup[i].attributes[j]['value_' + typeCode] =
            event.target.value;
          this.listGroup[i].attributes[j].colorCode = 2;
        }
      } else {
        const urlValid = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        if (urlValid.test(event.target.value)) {
          this.listGroup[i].attributes[j]['value_' + typeCode] =
            event.target.value;
          this.listGroup[i].attributes[j].validUrl = 2;
          this.urlValidMsg = false;
        } else {
          this.listGroup[i].attributes[j].validUrl = 1;
          this.urlValidMsg = true;
        }
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
        if (res) {
          this.uploadFile(res, i, j);
        }
      });
  }

  uploadFile(e, i, j) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].isLoading = true;
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    const buf = new Buffer(
      e.croppedImage.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    const dt = moment().valueOf();
    if (buf) {
      const params = {
        Key: 'profile_' + dt + '.jpg',
        ContentType: 'image/jpeg',
        Body: buf,
      };
      bucket.upload(params, (err, data) => {
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

  openDialogs(data, val, type?) {
    this.imgErrMsg = false;
    if (data.target.value) {
      this.dialogService
        .open(ImageCropperDialogComponent, {
          context: {
            type: type ? type : '',
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
              case 2:
                this.twitterIsLoading = true;
                break;
              case 3:
                this.ogIsLoading = true;
                break;
            }
            this.uploadFiless(res, val);
          }
        });
    }
  }

  seqId() {
    return this.seqIds++;
  }

  uploadFiless(image, val) {
    switch (val) {
      case 0:
        this.isLoading = true;
        this.imagesUrl.push({
          imageLink: image,
        });
        this.facebookImagesUrl = image;
        this.twitterImagesUrl = image;
        this.ogImagesUrl = image;
        this.isLoading = false;
        break;
      case 1:
        this.facebookIsLoading = true;
        this.facebookImagesUrl = image;
        this.facebookIsLoading = false;
        break;
      case 2:
        this.twitterIsLoading = true;
        this.twitterImagesUrl = image;
        this.twitterIsLoading = false;
        break;
      case 3:
        this.ogIsLoading = true;
        this.ogImagesUrl = image;
        this.ogIsLoading = false;
        break;
    }
  }

  removeImgs(k, val) {
    switch (val) {
      case 0:
        this.imagesUrl.splice(k, 1);
        (document.getElementById('imageUpload') as HTMLInputElement).value = '';
        break;
      case 1:
        this.facebookImagesUrl.splice(k, 1);
        (document.getElementById(
          'facebookImageUpload'
        ) as HTMLInputElement).value = '';
        break;
      case 2:
        this.twitterImagesUrl.splice(k, 1);
        (document.getElementById(
          'twitterImageUpload'
        ) as HTMLInputElement).value = '';
        break;
      case 3:
        this.ogImagesUrl.splice(k, 1);
        (document.getElementById('ogImageUpload') as HTMLInputElement).value =
          '';
        break;
    }
  }

  // locationSearch(event, i?, j?) {
  //   const target = event.target || event.srcElement || event.currentTarget;
  //   const idAttr = target.attributes.id;
  //   const id = idAttr.nodeValue;

  //   const input = document.getElementById(id);
  //   const autocomplete = new google.maps.places.Autocomplete(input);

  //   autocomplete.addListener('place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     this.addForm.controls.location.setValue(place.name);
  //     const placelatlng = {
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng(),
  //     };
  //     this.lat = place.geometry.location.lat();
  //     this.long = place.geometry.location.lng();
  //     this.locAddress = place.formatted_address;

  //     console.log('place.address_components===', place.address_components);
  //     for (let i=0; i<place.address_components.length; i++) {
  //       for (let j=0; j<place.address_components[i].types.length; j++) {
  //         if (place.address_components[i].types[j] === 'country') {
  //           this.addForm.controls.country.setValue(place.address_components[i].long_name);
  //         }
  //         if (
  //           place.address_components[i].types[j] ===
  //           'administrative_area_level_1'
  //         ) {
  //           this.addForm.controls.state.setValue(
  //             place.address_components[i].long_name
  //           );
  //         }

  //         if (place.address_components[i].types[j] === 'sublocality_level_2') {
  //           this.addressData = place.address_components[i].long_name;
  //         }
  //         if (place.address_components[i].types[j] === 'locality') {
  //           this.addForm.controls.city.setValue(
  //             place.address_components[i].long_name
  //           );
  //         }
  //         if (place.address_components[i].types[j] === 'postal_code') {
  //           this.addForm.controls.postalCode.setValue(
  //             place.address_components[i].long_name
  //           );
  //         }
  //         let fulladdress;
  //         if (place.address_components[i].types[j] === 'sublocality') {
  //           const address1 = place.address_components[i].long_name;
  //           console.log(this.addressData);
  //           console.log(address1);
  //           if (this.addressData) {
  //             fulladdress = this.addressData;
  //           }
  //           if (address1) {
  //             if (fulladdress) {
  //               fulladdress += ', ' + address1;
  //             } else {
  //               fulladdress += address1;
  //             }
  //           }
  //           this.addForm.controls.addressLine.setValue(fulladdress);
  //         }
  //       }
  //     }
  //   });
  // }
  locationSearchAttr(event, i?, j?) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const typeCode = this.listGroup[i].attributes[j].typeCode;
      const place = autocomplete.getPlace();
      // this.addForm.controls.location.setValue(place.name)
      // const placelatlng = {
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // }
      // this.lat = place.geometry.location.lat()
      // this.long = place.geometry.location.lng()
      // this.locAddress = place.formatted_address

      // console.log('place.address_components===', place.name+','+place.formatted_address)
      if (typeCode === 7) {
        // console.log(event.target.value);
        this.listGroup[i].attributes[j]['value_' + typeCode] =
          event.target.value;
      }
    });
  }

  // getModel(event, list, i, j) {
  //   this.listGroup[i]['attributes'][j]['model'] = [];
  //   this.listGroup[i]['attributes'][j]['value_16'] = [event, ''];

  //   this.service.getModel(event).subscribe(
  //     (res: any) => {
  //       // if(res.data.length > 0){
  //       // res.data.name = event.name;
  //       // this.selectedVehicle = event.name;
  //       // }
  //       // console.log('res.data[0].name', res.data)
  //       // this.brandsModelData = res.data;

  //       this.listGroup[i]['attributes'][j]['model'] = res.data;
  //       console.log(this.listGroup);
  //       // this.listGroup  = [...list]
  //       // this.listSubSubAsset = [];
  //       // this.listSubAsset = res.data;
  //       // this.listSubSubAsset = [];

  //       // this.addForm.controls.assetSubtypeId.updateValueAndValidity();
  //     },
  //     error => {
  //       console.log(this.listGroup);
  //       console.log(error);
  //       // this.listGroup[i]["attributes"][j]["model"]=[];
  //       // this.listGroup[i]["attributes"][j]["value_16"]=[event.name,""];
  //     }
  //   );
  // }

  getModelValue(event, list, i, j) {
    const attributes = 'attributes';
    const valuesixteen = 'value_16';
    console.log(event);
    this.listGroup[i][attributes][j][valuesixteen][1] = [event];
  }
}
