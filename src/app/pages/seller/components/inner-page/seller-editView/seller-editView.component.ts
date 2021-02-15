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
import { SellerService } from '../../service/seller.service';
import { Buffer } from 'buffer';
import {
  DatePickerComponent,
  CalendarView,
} from '@syncfusion/ej2-angular-calendars';

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
import { NewUsersSellerDialogComponent } from '../newuserseller-dialog/newuserseller-dialog.component';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';

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
  selector: 'app-seller-editview',
  templateUrl: './seller-editView.component.html',
  styleUrls: ['./seller-editView.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class SellerEditViewComponent implements OnInit {
  public start: CalendarView = 'Decade';
  public depth: CalendarView = 'Decade';
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public maxDates: object = new Date(this.today);
  public format = 'yyyy';
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: SellerService,
    private router: Router,
    private conf: Configuration,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService,
    private cloudinary: Cloudinary
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
    userId: new FormControl(),
    pin: new FormControl(),
    dob: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    // dropDownData: new FormControl(),
    addressName: new FormControl(),
    line1: new FormControl(),
    line2: new FormControl(),
    area: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    postalCode: new FormControl(),
    country: new FormControl(),
  };
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  listGroup = [];
  existingSellerFirstName: any;
  existingSellerLastName: any;
  existingDateOfBirthSeller: any;
  editAssetId: any;
  editSubId: any;
  editDataView: any;
  lat: any;
  long: any;
  locAddress: any;
  img = [];
  videos = [];
  afterGetApiMandatoryCount = [];
  beforeSubmitMandatoryCount = [];
  statusType: any;
  verifiedTextMessage: any;
  limit = 10;
  paginationIndex = 0;
  editSubSubId: any;
  userId: any;
  profilePicIcon: any;
  sellerDynamicData = [];
  langSelectors = [];
  listLang: any;
  docValue = [];
  imagesUrl = [];
  isLoading = false;
  imgErrMsg: any;

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  testDate: any;
  private index = 0;

  maxDate = moment(new Date()).format('YYYY-MM-DD');

  imagesLinks: any;
  duplicateCheckboxData = [];
  duplicateCheckboxValues = [];

  listUsers: any;

  currencies = [];

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
  urlValidMsg = false;

  googleAddress: any;
  locationAddress: any;
  locationCheck: any;

  videoData: any;
  // cloudinary video start
  // cloudinary start
  uploaderOptions: FileUploaderOptions = {
    url: `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/auto/upload`,
    autoUpload: true,
    isHTML5: true,
    removeAfterUpload: true,
    headers: [{ name: 'X-Requested-With', value: 'XMLHttpRequest' }],
  };
  uploader: FileUploader;
  uploaders: FileUploader;
  // cloudinary end
  // cloudinary video end

  docUpload = false;
  videoUpload = false;
  docIndex: any;
  docTypecode: any;

  videoIndex: any;
  videoTypecode: any;

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
      console.log('params seller edit view -----', params);
      this.statusCode = params.sCode;
      this.assetId = params.id;
      this.statusType = params.statusType;
    });

    // breadcrumb update
    if (this.assetId !== 1) {
      // this.getAssetList();
      // this.getAllAsset();
      this.getAllSeller(this.assetId, this.statusType);
    } else {
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    }
    // this.getAllSeller(this.assetId,this.statusType);
    this.getUserList();
    this.reasonaddForm();
    // this.getAllAsset();
    this.languageActive();
    this.getCurrencyList();

    // cloudinary
    this.uploader = new FileUploader(this.uploaderOptions);
    this.uploaders = new FileUploader(this.uploaderOptions);
    this.uploader.onBeforeUploadItem = (fileItem: any): any => {
      console.log('fileItem ', fileItem);
      fileItem.withCredentials = false;
      fileItem.secure = true;
    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.withCredentials = false;
      fileItem.upload_preset = this.cloudinary.config().upload_preset;
    };
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
    };
    this.uploader.onSuccessItem = this.imageUploader;
    this.uploaders.onSuccessItem = this.imageUploaders;
    this.uploader.uploadAll();
  }
  getAllSeller(id, statustype, event?) {
    console.log('id ', id);
    console.log('statustype ', statustype);
    console.log('event ', event);
    const list = {
      offset: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      userId: id,
      statusText: statustype,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.sellerList(list).subscribe(
      (res: any) => {
        this.editDataView = res.data[0];
        this.addForm.controls.userId.setValue(
          this.editDataView.username +
            ' (' +
            this.editDataView.email +
            ',' +
            this.editDataView.phoneNumber +
            ')'
        );
        this.addForm.controls.firstName.setValue(this.editDataView.firstName);
        this.addForm.controls.lastName.setValue(this.editDataView.lastName);
        this.addForm.controls.dob.setValue(
          this.editDataView.seller.attributes.dateOfBirth
        );
        this.sellerDynamicData = this.editDataView.seller.attributes.data;
        this.sellerDynamicData.map(x => {
          const value = `value_${x.typeCode}`;
          if (x.mandatory) {
            this.afterGetApiMandatoryCount.push({ x });
          }
          if (x.mandatory && x[value]) {
            this.beforeSubmitMandatoryCount.push({ x });
          }
        });

        if (this.sellerDynamicData) {
          const index = this.sellerDynamicData.findIndex(
            arr => arr.typeCode === 4
          );
          if (index !== -1) {
            this.duplicateCheckboxData = JSON.parse(
              JSON.stringify(this.sellerDynamicData[index].values)
            );
            if (this.sellerDynamicData[index].value_4) {
              this.duplicateCheckboxValues = JSON.parse(
                JSON.stringify(this.sellerDynamicData[index].value_4)
              );
            }
          }
        }
        console.log(
          'duplicateCheckboxData',
          this.duplicateCheckboxData,
          this.duplicateCheckboxValues
        );
        this.userId = this.editDataView._id;
        console.log(
          ' ----------- this.editDataView --------------------------- >',
          this.editDataView
        );
      },
      error => {
        console.log(error);
      }
    );
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
        console.log('====this.listUsers===>', this.listUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  // getChangeValueSellerData(val){
  //     console.log("val ******", val);
  //     // this.existingSellerFirstName = val._source.firstName;
  //     // this.existingSellerLastName = val._source.lastName;
  //     // this.existingDateOfBirthSeller = val._source.dateOfBirth;
  //     // this.existingDateOfBirthSeller = this.existingDateOfBirthSeller.split("T")[0];
  //     let userId = val._id;
  //     this.service.getSellerAttributes(userId).subscribe((res: any) => {

  //         console.log("this.sellerDynamicData+++++++++++++",this.sellerDynamicData);
  //         console.log("this.docValue+++++++++++++",this.docValue);

  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // getSelectedDropdownData(eve){
  //   console.log("----eve---", eve);
  // }

  // uploadIconFile(event, i){
  //   let ind = this.docValue.findIndex(val=> val.id == i);
  //   if(ind === -1){
  //     this.docValue.push({"id":i,"docUrl":event.target.value});
  //   } else {
  //     this.docValue[ind].docUrl = event.target.value;
  //     this.docValue[ind].id = i;
  //   }
  //   console.log("----this.docValue---", this.docValue);
  // }

  VerifySellerDocument(assetid) {
    console.log('assetid ---->', assetid);
    console.log('this.userId ---->', this.userId);
    const data = {
      sellerAttributesId: assetid,
      sellerId: this.userId,
    };

    this.service.postVerifyDocs(data).subscribe(
      (res: any) => {
        this.verifiedTextMessage = res.message;
        console.log('this.verifiedTextMessage ---', this.verifiedTextMessage);
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
        // this.addForm.controls['assetTypeId'].setValidators(Validators.required);
        // this.addForm.controls['assetTypeId'].updateValueAndValidity();
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
        console.log('----getAsset---->>>>>>>>>>>>>>>>>', getAsset);
        this.reOrderGroup(getAsset.details);
        const userIndex =
          this.listUsers &&
          this.listUsers.findIndex(x => x._id === getAsset.userId);
        if (userIndex > -1) {
          this.addForm.controls.userId.setValue(this.listUsers[userIndex]);
        }
        // console.log('userIndex', userIndex)
        this.imagesUrl = getAsset.images ? getAsset.images : [];
        this.addForm.controls.title.setValue(getAsset.title);
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
        const breadcrumb = { AddtagT: 'Edit (' + getAsset.title + ')' };
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
    this.formObj.firstName = new FormControl('', [Validators.required]);
    this.formObj.lastName = new FormControl('', [Validators.required]);
    // this.formObj.dropDownData = new FormControl('', [Validators.required]);
    // for(var i=0; i<this.docValue.length;i++){
    //   this.formObj['imagedata'+ i] = new FormControl("", [Validators.required]);
    // }

    // this.formObj['imagesurlpic'] = new FormControl("", [Validators.required]);

    // address fields
    // this.formObj.addressName = new FormControl('', [Validators.required]);
    // this.formObj.line1 = new FormControl('', [Validators.required]);
    // this.formObj.line2 = new FormControl('', [Validators.required]);
    // this.formObj.area = new FormControl('', [Validators.required]);
    // this.formObj.city = new FormControl('', [Validators.required]);
    // this.formObj.state = new FormControl('', [Validators.required]);
    // this.formObj.postalCode = new FormControl('', [Validators.required]);
    // this.formObj.country = new FormControl('', [Validators.required]);

    this.addForm = this.formBuilder.group(this.formObj);
  }

  sellerPatchEditSubmit(data: any) {
    this.beforeSubmitMandatoryCount = [];
    this.sellerDynamicData.map(x => {
      console.log(x);
      const value = `value_${x.typeCode}`;

      if (x.mandatory && x[value]) {
        this.beforeSubmitMandatoryCount.push({ x });
      }
    });
    console.log(this.afterGetApiMandatoryCount.length);
    console.log(this.beforeSubmitMandatoryCount.length);
    if (
      this.afterGetApiMandatoryCount.length !==
      this.beforeSubmitMandatoryCount.length
    ) {
      this.showToast('top-right', 'mandatory fields are missing', 'danger');
      return;
    }
    // this.submitted = true;
    const dataObject = {
      userid: this.userId,
      attributes: {
        // documentValues:this.imagesUrl,  // this.docValue
        dateOfBirth: data.dob,
        firstname: data.firstName,
        lastname: data.lastName,
        // dropdowndata:data.dropDownData,
        data: this.sellerDynamicData,
      },
    };
    console.log('dataObject', dataObject);
    this.service.sellerPatch(dataObject).subscribe(
      (res: any) => {
        console.log('------sellerPatch--res.data***', res.data);
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
  }

  onRangeChange(changeContext: ChangeContext, i): void {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    this.sellerDynamicData[i]['value_' + typeCode] = {
      min: changeContext.value,
      max: changeContext.highValue,
    };
    this.sellerDynamicData[i].checked = true;
  }
  groupTextList(event, i) {
    console.log(event.target.value);
    const typeCode = this.sellerDynamicData[i].typeCode;
    // this.sellerDynamicData[i]["value_" + typeCode] =
    // event.target.value;
    console.log('----', typeCode);
    this.sellerDynamicData[i].errMsg = false;
    const keyLength = event.target.value.length;
    if (
      typeCode !== 9 &&
      typeCode !== 17 &&
      typeCode !== 16 &&
      typeCode !== 10 &&
      typeCode !== 11
    ) {
      if (
        keyLength < Number(this.sellerDynamicData[i].valueMin) ||
        keyLength > Number(this.sellerDynamicData[i].valueMax)
      ) {
        this.sellerDynamicData[i].checked = false;
        this.sellerDynamicData[i].colorCode = 1;
      } else {
        this.sellerDynamicData[i]['value_' + typeCode] = event.target.value;
        this.sellerDynamicData[i].checked = true;
        this.sellerDynamicData[i].colorCode = 2;
      }
    } else {
      if (
        typeCode !== 17 &&
        typeCode !== 16 &&
        typeCode !== 10 &&
        typeCode !== 11
      ) {
        if (
          event.target.value < Number(this.sellerDynamicData[i].valueMin) ||
          event.target.value > Number(this.sellerDynamicData[i].valueMax)
        ) {
          this.sellerDynamicData[i].colorCode = 1;
        } else {
          this.sellerDynamicData[i]['value_' + typeCode] = event.target.value;
          this.sellerDynamicData[i].colorCode = 2;
        }
      } else {
        this.sellerDynamicData[i]['value_' + typeCode] = event.target.value;

        const urlValid = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        if (urlValid.test(event.target.value)) {
          console.log('else--------->');
          this.sellerDynamicData[i]['value_' + typeCode] = event.target.value;
          this.sellerDynamicData[i].validUrl = 2;
          this.urlValidMsg = false;
        } else {
          console.log('else1--------->');
          this.sellerDynamicData[i].validUrl = 1;
          this.urlValidMsg = true;
        }
      }
    }
  }

  groupCheckBox(event, value, i, j) {
    console.log('index--------->', value, i);
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
      console.log('not');
    }
    const index = this.sellerDynamicData[i]['value_' + typeCode].findIndex(
      x => x === value
    );
    console.log(index);
    console.log(this.sellerDynamicData);
    if (index > -1) {
      // delete this.sellerDynamicData[i]['value_'+typeCode][index];
      this.sellerDynamicData[i]['value_' + typeCode].splice(index, 1);
      console.log('yes', this.sellerDynamicData[i]['value_' + typeCode]);
      console.log('duplicatedata', this.duplicateCheckboxData);
      console.log('duplicatedata', this.duplicateCheckboxValues);
    } else {
      this.sellerDynamicData[i]['value_' + typeCode].push(value);
      console.log('no', this.sellerDynamicData[i]['value_' + typeCode]);
      console.log('duplicatedata', this.duplicateCheckboxValues);
    }
    // if (event.target.checked) {
    //   this.sellerDynamicData[i]['value_'+typeCode].push(value);
    // }
    // this.sellerDynamicData[i].checked = this.sellerDynamicData[i]['value_'+typeCode].length > 0? true: false;
  }

  plusMinus(event: number, i) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = 1;
    }
    const count = this.sellerDynamicData[i]['value_' + typeCode];
    const value = Math.min(Math.max(1, count + event));
    this.sellerDynamicData[i]['value_' + typeCode] = value;
    this.sellerDynamicData[i].checked = true;
  }

  groupChangeSelects(event, i) {
    console.log('i--groupChangeSelect-->', i);
    console.log('event--groupChangeSelect-->', event);
    const typeCode = this.sellerDynamicData[i].typeCode;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
    }
    const index = this.sellerDynamicData[i]['value_' + typeCode];
    if (index) {
      this.sellerDynamicData[i]['value_' + typeCode] = event;
    }
  }

  groupChangeSelect(event, i, j) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    this.sellerDynamicData[i]['value_' + typeCode] = event;
    this.sellerDynamicData[i].checked = true;
  }

  rangeValidation(min, max) {
    this.options.floor = min;
    this.options.ceil = max;
    this.options.step = 1;
  }
  locationSearch(event, val, typecode?) {
    console.log(event);
    const typecodes = typecode;
    const iIndex = val;
    this.locationCheck = event;
    // this.sellerDynamicData[i]["value_" + typecode] = this.locationCheck.target.value ;
    // console.log('event.target.value', i, event, this.sellerDynamicData[i]);
    // console.log(this.locationCheck);
    //  this.sellerDynamicData[i]["value_" + typecode] = this.locationCheck ;
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const AddressCheck = place.formatted_address;
      this.locationCheck = AddressCheck;
      this.sellerDynamicData[iIndex]['value_' + typecodes] = this.locationCheck;

      console.log('-------->', this.locationCheck);
      this.locationAddress = place.name;
      // this.addForm.controls["location"].setValue(place.name);
      const placelatlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.lat = place.geometry.location.lat();
      this.long = place.geometry.location.lng();
      this.locAddress = place.formatted_address;

      // for (let i = 0; i < place.address_components.length; i++) {
      for (const i of place.address_components) {
        // for (let j = 0; j < place.address_components[i].types.length; j++) {
        for (const j of place.address_components[i].types) {
          if (place.address_components[i].types[j] === 'country') {
            this.addForm.controls.country.setValue(
              place.address_components[i].long_name
            );
          }
          if (
            place.address_components[i].types[j] ===
            'administrative_area_level_1'
          ) {
            this.addForm.controls.state.setValue(
              place.address_components[i].long_name
            );
          }

          let address;
          if (place.address_components[i].types[j] === 'route') {
            address = place.address_components[i].long_name;
          }
          if (place.address_components[i].types[j] === 'locality') {
            this.addForm.controls.city.setValue(
              place.address_components[i].long_name
            );
          }
          let fulladdress;
          if (place.address_components[i].types[j] === 'sublocality') {
            const address1 = place.address_components[i].long_name;

            if (address) {
              fulladdress = address;
            }
            if (address1) {
              if (fulladdress) {
                fulladdress += ', ' + address1;
              } else {
                fulladdress += address1;
              }
            }
            console.log(fulladdress);
          }
          // this.addForm.controls["addressLine"].setValue(fulladdress);
          // this.locationAddress = fulladdress;
        }
      }
    });
  }

  imageUploader = (
    item: any,
    response: string,
    status: number,
    headers: any
  ): any => {
    const cloudinaryImage = JSON.parse(response);
    console.log('cloudinaryImage', cloudinaryImage);
    const list = {
      img: cloudinaryImage.secure_url,
      cloudinaryPublicId: cloudinaryImage.public_id,
      containerHeight: cloudinaryImage.height,
      containerWidth: cloudinaryImage.width,
    };
    // this.submitData(list);

    // this.profilePicIcon = cloudinaryImage.secure_url;
    // this.addForm.get('videoData').setValue(cloudinaryImage.secure_url);
    console.log('------------------->', cloudinaryImage.secure_url);
    this.videoData = cloudinaryImage.secure_url;
    // this.isLoadingIcon = false;

    // if (this.docUpload === true) {
    //   const docData = {
    //     docLink: cloudinaryImage.secure_url,
    //     seqId: this.docIndex,
    //   };
    //   this.sellerDynamicData[this.docIndex][
    //     'value_' + this.docTypecode
    //   ] = docData;
    //   this.sellerDynamicData[this.docIndex].checked =
    //     this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
    //       .length > 0
    //       ? true
    //       : false;
    //   this.sellerDynamicData[this.docIndex].isLoading = false;
    //   console.log(
    //     "this.sellerDynamicData[this.docIndex]['value_'+this.docTypecode]",
    //     this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
    //   );
    //   this.docUpload = false;
    if (this.docUpload === true) {
      // document
      //   .getElementsByClassName('view_' + this.docIndex)[0]
      //   .setAttribute('href', cloudinaryImage.secure_url);
      // const docData = {
      //   docLink: cloudinaryImage.secure_url,
      //   seqId: this.docIndex,
      // };
      // this.sellerDynamicData[this.docIndex] = {
      //   docLink: cloudinaryImage.secure_url,
      //   seqId: this.docIndex,
      // };
      // this.sellerDynamicData[this.docIndex][
      //   'value_' + this.docTypecode
      // ] = docData;
      //  console.log(this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
      //  .length);

      if (
        this.sellerDynamicData[this.docIndex].hasOwnProperty(
          `value_${this.docTypecode}`
        )
      ) {
        this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode].push(
          {
            docLink: cloudinaryImage.secure_url,
            seqId:
              this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
                .length + 1,
          }
        );
      } else {
        this.sellerDynamicData[this.docIndex][`value_${this.docTypecode}`] = [];
        this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode].push(
          {
            docLink: cloudinaryImage.secure_url,
            seqId:
              this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
                .length + 1,
          }
        );
      }

      console.log(this.sellerDynamicData);
      this.sellerDynamicData[this.docIndex].checked =
        this.sellerDynamicData[this.docIndex]['value_' + this.docTypecode]
          .length > 0
          ? true
          : false;
      this.sellerDynamicData[this.docIndex].isLoading = false;
      this.docUpload = false;
    } else if (this.videoUpload === true) {
      console.log(this.videoIndex);
      this.videos.push({
        videoLink: cloudinaryImage.secure_url,
        seqId:
          this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
            .length + 1,
      });
      this.sellerDynamicData[this.videoIndex].isLoading = false;
      this.videoUpload = false;
      console.log(this.videos);
      this.sellerDynamicData[this.videoIndex][
        'value_' + this.videoTypecode
      ] = this.videos;
    } else {
      //   this.sellerDynamicData[this.videoIndex][
      //     'value_' + this.videoTypecode
      //   ]
      //  this.videos.push({
      //     videoLink: cloudinaryImage.secure_url,
      //     seqId:
      //       this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
      //         .length + 1,
      //   });
      //   // this.sellerDynamicData[this.videoIndex][`value_${this.videoTypecode}`] = this.videos
      //   this.sellerDynamicData[this.videoIndex].checked =
      //     this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
      //       .length > 0
      //       ? true
      //       : false;
      //   this.sellerDynamicData[this.videoIndex].isLoading = false;
      //   console.log(
      //     "this.sellerDynamicData[this.videoIndex]['value_'+this.videoTypecode]",
      //     this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
      //   );
    }
  };
  imageUploaders = (
    item: any,
    response: string,
    status: number,
    headers: any
  ): any => {
    const cloudinaryImage = JSON.parse(response);
    // this.submitSignup(cloudinaryImage.secure_url);
  };
  uploadIconFile(event, i, typecode) {
    document.getElementsByClassName('view_' + i)[0].innerHTML = 'View';
    document.getElementsByClassName('viewClose_' + i)[0].innerHTML = 'X';
    document
      .getElementsByClassName('chooseView_' + i)[0]
      .setAttribute('style', 'margin-left: 0px');
    this.docIndex = i;
    this.docTypecode = typecode;
    // let ind = this.docValue.findIndex(val=> val.id == i);
    // console.log('event', event.target.value.split('.').pop())
    // this.uploadDocuments(event,i, typecode);
    this.docUpload = true;
    this.uploader.uploadAll();
  }
  videoChangeEvent(e, i) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.videoIndex = i;
    this.videoTypecode = typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
    }
    this.sellerDynamicData[i].isLoading = true;
    //  this.videos.push()
    //  this.videos.push({
    //   videoLink: image,
    // });
    this.videoUpload = true;
    const asd = this.uploader.uploadAll();
    console.log(asd);
    //   var bucket = new AWS.S3({ params: { Bucket: "lopongo" } });
    //   var fileChooser = e.srcElement;
    //   var file = fileChooser.files[0];
    //  const dt = moment().valueOf();
    //   if (file) {
    //     var params = {
    //       Key: "video_" + dt,
    //       ContentType: file.type,
    //       Body: file
    //     };
    //     bucket.upload(params, (err, data) => {
    //       this.sellerDynamicData[i]['value_'+typeCode].push({
    //         videoLink: data.Location,
    //         seqId: this.sellerDynamicData[i]['value_'+typeCode].length+1
    //       });
    //       this.sellerDynamicData[i].checked = this.sellerDynamicData[i]['value_'+typeCode].length > 0?true:false;
    //       this.sellerDynamicData[i].isLoading = false;
    //     });
    //   }
    //   return false;
  }

  // remove videos start

  removeVideo(i, k) {
    console.log(i, k);
    // this.videos.splice(k, 1);
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i]['value_' + typeCode].splice(k, 1);
  }
  // remove video end

  // remove doc start
  removeDocument(i, typecode, k) {
    // this.sellerDynamicData[i]['value_'+typecode].docLink = '';
    // document.getElementsByClassName('view_' + i)[0].removeAttribute('href');
    // document.getElementsByClassName('view_' + i)[0].innerHTML = '';
    // document.getElementsByClassName('viewClose_' + i)[0].innerHTML = '';
    // document
    //   .getElementsByClassName('chooseView_' + i)[0]
    //   .setAttribute('style', 'margin-left: -25px');
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i]['value_' + typeCode].splice(k, 1);
  }
  // remove doc end

  removeImg(i, j, k) {
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j]['value_' + typeCode].splice(k, 1);
    this.listGroup[i].attributes[j].checked =
      this.listGroup[i].attributes[j]['value_' + typeCode].length > 0
        ? true
        : false;
  }

  fileChangeEvent(event: any, i): void {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
    }
    console.log('image uploaded', this.img);
    this.openDialog(event, i);
  }

  chosenYearHandler(
    normalizedYear: Moment,
    datepicker: OwlDateTimeComponent<Moment>,
    i
  ) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    this.sellerDynamicData[i]['value_' + typeCode] = normalizedYear.year();
    this.sellerDynamicData[i]['values_' + typeCode] = ctrlValue;
    this.sellerDynamicData[i].checked = true;
    datepicker.close();
  }

  openDialog(data, i) {
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
          this.uploadFiless(res, 0, data, i);
          // this.uploadFile(res, i);
        }
      });
  }

  uploadFiless(image, val, event, i) {
    switch (val) {
      case 0:
        this.isLoading = true;
        this.img.push({
          imageLink: image,
        });
    }

    if (
      this.sellerDynamicData[i]['value_' + this.sellerDynamicData[i].typeCode]
    ) {
      this.sellerDynamicData[i][
        'value_' + this.sellerDynamicData[i].typeCode
      ] = this.img;
    }
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
          this.uploadFiles(res, 0);
        }
      });
  }
  seqId() {
    return this.seqIds++;
  }

  uploadFiles(e, i) {
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
        const typeCode = this.sellerDynamicData[i].typeCode;
        if (!this.sellerDynamicData[i]['value_' + typeCode]) {
          this.sellerDynamicData[i]['value_' + typeCode] = [];
        }
        const index = this.sellerDynamicData[i]['value_' + typeCode];
        if (index) {
          this.sellerDynamicData[i]['value_' + typeCode] = data.Location;
          this.sellerDynamicData[i].isAdminVerified = false;
        }
        this.isLoading = false;
      });
    }
    return false;
  }

  removeImgs(k) {
    this.imagesUrl.splice(k, 1);
    (document.getElementById('imageUpload') as HTMLInputElement).value = '';
  }

  // create new user dialog
  openNewUserDialog() {
    this.dialogService
      .open(NewUsersSellerDialogComponent, {
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

  numericalType(data) {
    // console.log(data);
    // if(data){
    // return data.name.split('-')[1]
    // }
  }
  dateP(event, i, j) {
    console.log(event.value, i, j);
    const year = moment(event.value, 'DD/MM/YYYY').year();

    this.sellerDynamicData[i].value_12 = year;
  }
}
