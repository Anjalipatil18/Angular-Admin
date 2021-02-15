import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { ModelsService } from '../../service/models.service';
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
  selector: 'app-models-edit',
  templateUrl: './models-add.component.html',
  styleUrls: ['./models-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class AddModelsComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: ModelsService,
    private router: Router,
    private conf: Configuration,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService
  ) {
    this.configSelect.notFoundText = 'No Models found!';
  }

  get f() {
    return this.addForm.controls;
  }

  @Output() modelsData = new EventEmitter<any>();

  items = [];

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
  statusText: any;
  modelId: any;
  statusCode: any;
  formObj = {};
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

  parentData: any;

  listUsers: any;

  currencies = [];
  // get currency list end

  unitsList = [];

  currencySymbol: any;
  unitsSymbol: any;

  errMsg: any;
  userDataVal = false;

  curWithVal = '1234';

  seqIds = 1;

  allBrands: any;
  allBrandsData = {};
  limit = 10;
  paginationIndex = 0;

  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(msg || 'failed!', 'Alert message', {
      position,
      status,
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('params---------------------------->', params);
      // this.statusCode = params['sCode'];
      // this.assetId = params['id'];
      // this.statusText = params['statusText'];
      this.statusCode = params.name;
      this.assetId = params.id;
      this.statusText = params.status;
      this.modelId = params.modelId;
      const title = this.modelId === '1' ? 'Add' : 'Edit';
      const breadcrumb = { AddtagT: title };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
    this.languageActive();
    // this.reasonaddForm();
    this.getCurrencyList();
    // this.statusText == 2 ? this.getAllModels() : '';
    // this.parentData = this.service.getModelsData();
    // console.log('models add parent data =================>', this.parentData);
  }

  // brands update chips
  onSelect(event) {
    console.log('chips select data', event.target.value);
  }
  onAdd(event, lang) {
    const index = this.items.findIndex(arr => arr.lang === lang);
    index > -1
      ? this.items[index].value.push(event.value)
      : this.items.push({ lang, value: [event.value] });
    // this.addForm.controls['models'].setValue(this.items);

    // this.langSelectors.map(x => {
    this.items.map(x => {
      x.lang === lang
        ? this.addForm.controls['models_' + [lang]].setValue(x.value)
        : this.addForm.controls['models_' + [lang]].setValue('');
    });
    // this.addForm.controls['models_'+[lang]].setValue(this.items);
    // })

    // this.listLang.map(x =>  {
    //   this.langSelectors.push({
    //     languageCode:x.languageCode,
    //     language :x.language,
    //     active:false
    //   })
    //   this.addForm.controls['models_'+[x.languageCode]].setValue(this.items);
    // });
  }
  onRemove(event, lang) {
    const index = this.items.findIndex(
      arr => arr.lang === lang && arr.value === event
    );
    const val = index !== -1 ? this.items.splice(index, 1) : '';
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
    //  this.getAllModels(list);
    // }
  }

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        console.log('assetType', res);
        this.listAsset = res.data;
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
        // this.addForm.controls['title'].setValue(getAsset.title.en);
        this.addForm.controls.currency.setValue(getAsset.units);
        this.currencySymbol = getAsset.units
          ? getAsset.units.code + ' - ' + getAsset.units.symbol
          : '';
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
          // this.formObj['models_'+[x.languageCode]] = new FormControl("");
          // this.formObj['brands_'+[x.languageCode]] = new FormControl("");
          // this.formObj['tag_'+[x.languageCode]] = new FormControl("");
        });
        // this.addForm = this.formBuilder.group(this.formObj);
        console.log('this.langSelector', this.langSelectors);
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addForm.controls[
            'models_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'models_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
          // this.addForm.controls['brands_'+this.langSelectors[index].languageCode].setValidators(Validators.required);
          // this.addForm.controls['brands_'+this.langSelectors[index].languageCode].updateValueAndValidity();
          // this.addForm.controls['tag_'+this.langSelectors[index].languageCode].setValidators(Validators.required);
          // this.addForm.controls['tag_'+this.langSelectors[index].languageCode].updateValueAndValidity();
        }
        //  this.getAllModels();
        const val = this.modelId !== '1' ? this.getAllModels() : '';
      },
      error => {
        console.log(error);
      }
    );
  }
  reportCheckbox(event, i, lang) {
    this.errMsg = false;
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addForm.controls['models_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['models_' + lang].updateValueAndValidity();
      // this.addForm.controls['brands_'+lang].setValidators(Validators.required);
      // this.addForm.controls['brands_'+lang].updateValueAndValidity();
      // this.addForm.controls['tag_'+lang].setValidators(Validators.required);
      // this.addForm.controls['tag_'+lang].updateValueAndValidity();
    } else {
      this.addForm.controls['models_' + lang].setValidators(null);
      this.addForm.controls['models_' + lang].updateValueAndValidity();
      this.addForm.controls['models_' + lang].setValue('');
      // this.addForm.controls['brands_'+lang].setValidators(null);
      // this.addForm.controls['brands_'+lang].updateValueAndValidity();
      // this.addForm.controls['brands_'+lang].setValue('');
      // this.addForm.controls['tag_'+lang].setValidators(null);
      // this.addForm.controls['tag_'+lang].updateValueAndValidity();
      // this.addForm.controls['tag_'+lang].setValue('');
    }
    this.userDataVal = true;
    // this.validation();
    // console.log('thisadduserform', this.addForm.value);
  }

  validation() {
    this.langSelectors.map(x => {
      this.addForm.controls[
        'valueMin_' + [x.languageCode]
      ].updateValueAndValidity();
      this.addForm.controls[
        'valueMax_' + [x.languageCode]
      ].updateValueAndValidity();

      this.addForm.controls[
        'unitMin_' + [x.languageCode]
      ].updateValueAndValidity();
      this.addForm.controls[
        'unitMax_' + [x.languageCode]
      ].updateValueAndValidity();

      this.addForm.controls[
        'values_' + [x.languageCode]
      ].updateValueAndValidity();
      this.addForm.controls[
        'numericalType_' + [x.languageCode]
      ].updateValueAndValidity();

      this.addForm.controls[
        'valuea_' + [x.languageCode]
      ].updateValueAndValidity();

      // add new form value
      const val = this.addForm.value['valueMin_' + [x.languageCode]];
      const vals = this.addForm.value['valueMax_' + [x.languageCode]];
      const valss = this.addForm.value['unitMin_' + [x.languageCode]];
      // this.unitValue = this.addForm.value['unitMin_'+[x.languageCode]];
      // console.log(
      //   'unit selected value',
      //   this.addForm.value['unitMin_' + [x.languageCode]],
      //   this.addForm.value['unitMin_' + [x.languageCode]]
      // );
      const vala = this.addForm.value['unitMax_' + [x.languageCode]];
      const valb = this.addForm.value['numericalType_' + [x.languageCode]];
      const valc = this.addForm.value['values_' + [x.languageCode]];

      const vald = this.addForm.value['valuea_' + [x.languageCode]];

      //  add && edit form value
      // this.addForm.controls['valueMin_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['valueMin_'+[x.languageCode]]:this.userDataVal && x.active && valueMin_? valueMin_:'');
      // this.addForm.controls['valueMax_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['valueMax_'+[x.languageCode]]:this.userDataVal && x.active && valueMax_? valueMax_:'');
      // this.addForm.controls['unitMin_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['unitMin_'+[x.languageCode]]:this.userDataVal && x.active && unitMin_? unitMin_:'');
      // this.addForm.controls['unitMax_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['unitMax_'+[x.languageCode]]:this.userDataVal && x.active && unitMax_? unitMax_:'');
      // this.addForm.controls['numericalType_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['numericalType_'+[x.languageCode]]:this.userDataVal && x.active && numericalType_? numericalType_:'');
      // this.addForm.controls['values_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['values_'+[x.languageCode]]:this.userDataVal && x.active && values_? values_:'');
      // this.addForm.controls['valuea_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['valuea_'+[x.languageCode]]:this.userDataVal && x.active && valuea_? valuea_:'');
    });
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
    this.langSelectors.map(x => {
      this.formObj['models_' + [x.languageCode]] = new FormControl('', [
        Validators.required,
      ]);
      // this.formObj['brands_'+[x.languageCode]] = new FormControl("", [Validators.required]);
      // this.formObj['tag'] = new FormControl("", [Validators.required]);
    });
    // this.formObj['modelsLength'] = new FormControl("", [Validators.required]);

    // this.formObj['models'] = new FormControl("", [Validators.required]);
    // this.formObj['brands'] = new FormControl("", [Validators.required]);
    // this.formObj['tag'] = new FormControl("", [Validators.required]);
    this.addForm = this.formBuilder.group(this.formObj);
  }

  getUsers(data: any) {
    const modelIds = {};
    const model = { name: {} };
    let list;
    if (this.modelId === '1') {
      this.langSelectors.map(x => {
        if (x.active) {
          const item = x.languageCode;
          model.name[item] = data['models_' + x.languageCode];
        }
      });
      list = {
        brandId: this.assetId,
        model,
      };
    } else {
      this.langSelectors.map(x => {
        if (x.active) {
          const item = x.languageCode;
          model.name[item] = data['models_' + x.languageCode];
        }
      });
      // this.langSelectors.map(x => {
      //   if(x.active){
      //     this.allBrands['model_'+[x.languageCode]].map(model => {
      //       modelIds['model_'+[x.languageCode]] = model.id;
      //     })
      //   }
      // })
      list = {
        modelIds: [this.modelId],
        model,
      };
    }

    console.log('post data', list);
    this.service.modelsPostList(list, this.modelId).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast('top-right', 'Models added successfully!', 'success');
      },
      error => {
        console.log(error);
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
    const dt = moment().valueOf();
    const buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    let fileName;
    if (this.addForm.controls.tag.value) {
      fileName = this.addForm.controls.tag.value;
    } else {
      fileName = 'model';
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
    });
  }
  // get brands
  getAllModels(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: this.statusText === 2 ? 'inactive' : 'active',
      id: this.assetId,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.modelsList(list, event).subscribe(
      (res: any) => {
        this.allBrands = res.data[0];
        // const resEdit = res.data[0].languages;
        console.log('this.allBrands', this.allBrands, this.modelId);

        const index = this.allBrands.models.findIndex(
          arr => arr._id === this.modelId
        );
        console.log('index', index);
        if (index !== -1) {
          const keys = Object.keys(this.allBrands.models[index].name);
          for (const key of keys) {
            const langIndex = this.langSelectors.findIndex(
              arr => arr.languageCode === key
            );
            if (langIndex !== -1) {
              this.langSelectors[langIndex].active = true;
              this.addForm.controls[
                'models_' + this.langSelectors[langIndex].languageCode
              ].setValue(this.allBrands.models[index].name[key]);
            }
          }
          // const index = this.langSelectors.findIndex(x=>x.languageCode == this.allBrands['models'][index].name);
          // this.langSelectors[index].active = true;
        }

        // for(const prop in resEdit){
        //   if(resEdit[prop] && prop != undefined){
        //     const index = this.langSelectors.findIndex(x=>x.languageCode == prop);
        //     this.langSelectors[index].active = true;
        //   }
        // }
        // this.langSelectors.map(x =>  {
        //   if(x.active){
        //     this.allBrands['model_'+x.languageCode].map(model => {
        //       console.log('models data get', model);
        //       this.addForm.controls['models_'+x.languageCode].setValue(model.name);
        //     })
        //   }
        // })
      },
      error => {
        this.allBrands = null;
        console.log(error);
      }
    );
  }
}
