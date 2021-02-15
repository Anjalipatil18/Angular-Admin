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
import { print } from '@syncfusion/ej2-base';
import { ColorsRoutingModule } from 'src/app/pages/colors/colors-routing.module';

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
  selector: 'app-seller-add',
  templateUrl: './seller-add.component.html',
  styleUrls: ['./seller-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class SellerAddComponent implements OnInit {
  public start: CalendarView = 'Decade';
  public depth: CalendarView = 'Decade';
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public maxDate: object = new Date(this.today);
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
    userId: new FormControl('', [Validators.required]),
    // pin: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    // address fields
    // addressName: new FormControl('', [Validators.required]),
    // line1: new FormControl('', [Validators.required]),
    // line2: new FormControl('', [Validators.required]),
    // area: new FormControl('', [Validators.required]),
    // city: new FormControl('', [Validators.required]),
    // state: new FormControl('', [Validators.required]),
    // postalCode: new FormControl('', [Validators.required]),
    // country: new FormControl('', [Validators.required]),

    // dyanamic  form
    // dropDownData: new FormControl(''),
    // sellerInputText: new FormControl(''),
    // sellerInputTextArea: new FormControl(''),
    // sellerInputTextLocation: new FormControl(''),
    // sellerInputDateTime: new FormControl(''),
    // sellerInputDate: new FormControl(''),
    // sellerInputYear: new FormControl(''),
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
  editSubSubId: any;
  lat: any;
  long: any;
  locAddress: any;
  sellerDynamicData = [];
  langSelectors = [];
  listLang: any;
  docValue = [];
  imagesUrl = [];
  isLoading = false;
  imgErrMsg: any;
  img = [];
  videos = [];
  afterGetApiMandatoryCount = [];
  beforeSubmitMandatoryCount = [];
  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  testDate: any;
  private index = 0;

  // maxDate = moment(new Date()).format('YYYY-MM-DD');

  listUsers: any;
  urlValidMsg = false;
  videoData: any;
  docDataSelected: any;
  docUpload = false;
  videoUpload = false;
  docIndex: any;
  docTypecode: any;
  videoIndex: any;
  videoTypecode: any;
  currencies = [];
  seqIds = 1;
  docs: any;
  googleAddress: any;
  locationAddress: any;
  locationCheck: any;

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

  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(msg || 'failed!', 'Alert message', {
      position,
      status,
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.statusCode = params.sCode;
      this.assetId = params.id;
    });

    // breadcrumb update
    if (this.assetId !== 1) {
      this.getAllAsset();
    } else {
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    }

    this.getUserList();
    this.reasonaddForm();
    this.languageActive();
    this.getCurrencyList();

    // cloudinary
    this.uploader = new FileUploader(this.uploaderOptions);
    this.uploaders = new FileUploader(this.uploaderOptions);
    this.uploader.onBeforeUploadItem = (fileItem: any): any => {
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

  getUserList() {
    const list = {
      query: '',
      trigger: 2,
    };
    this.service.userGetList(list).subscribe(
      (res: any) => {
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
      },
      error => {
        console.log(error);
      }
    );
  }

  getChangeValueSellerData(val) {
    if (val) {
      this.existingDateOfBirthSeller = val.dateOfBirth;
      this.existingSellerFirstName = val.firstName;
      this.existingSellerLastName = val.lastName;
      this.existingDateOfBirthSeller = val.dateOfBirth ? val.dateOfBirth : '';
      if (this.existingDateOfBirthSeller) {
        this.existingDateOfBirthSeller = this.existingDateOfBirthSeller
          ? this.existingDateOfBirthSeller.split('T')[0]
          : '';
      }

      const userId = val._id;
      this.service.getSellerAttributes(userId).subscribe(
        (res: any) => {
          this.sellerDynamicData = res.data;
          console.log(this.sellerDynamicData);
          const validators = [Validators.required];

          res.data.map(x => {
            if (x.mandatory) {
              this.afterGetApiMandatoryCount.push({ x });
            }
          });
          // for (let index = 0; index < this.sellerDynamicData.length; index++) {
          //   if(this.sellerDynamicData[index].typeCode === 1 && this.sellerDynamicData[index].mandatory){
          //     this.addForm.controls['sellerInputText'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputText'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputText', new FormControl('', validators));
          //   } else if (this.sellerDynamicData[index].typeCode === 2 && this.sellerDynamicData[index].mandatory){
          //     console.log('asdasdads');
          //     this.addForm.controls['sellerInputTextArea'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputTextArea'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputTextArea', new FormControl('', validators));
          //   }else if(this.sellerDynamicData[index].typeCode === 7 && this.sellerDynamicData[index].mandatory  ){
          //     this.addForm.controls['sellerInputTextLocation'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputTextLocation'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputTextLocation', new FormControl('', validators));
          //   }else if(this.sellerDynamicData[index].typeCode === 10 && this.sellerDynamicData[index].mandatory ){
          //     this.addForm.controls['sellerInputDateTime'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputDateTime'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputDateTime', new FormControl('', validators));
          //   }else if(this.sellerDynamicData[index].typeCode === 11 && this.sellerDynamicData[index].mandatory){
          //     this.addForm.controls['sellerInputDate'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputDate'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputDate', new FormControl('', validators));
          //   }
          //   else if(this.sellerDynamicData[index].typeCode === 12 && this.sellerDynamicData[index].mandatory){
          //     this.addForm.controls['sellerInputYear'].setValidators(Validators.required)
          //     this.addForm.controls['sellerInputYear'].updateValueAndValidity()
          //     // this.addForm.addControl('sellerInputYear', new FormControl('', validators));
          //   }

          // }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  // validate(){
  //   for (let index = 0; index < this.sellerDynamicData.length; index++) {
  //     this.formObj['title_' + [index.languageCode]] = new FormControl('')
  //   }
  // }

  groupChangeSelects(event, i) {
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

  groupCheckBox(event, value, i, j) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
    }
    const index = this.sellerDynamicData[i]['value_' + typeCode].findIndex(
      x => x === value
    );
    if (index > -1) {
      this.sellerDynamicData[i]['value_' + typeCode].splice(index, 1);
    }
    if (event.target.checked) {
      this.sellerDynamicData[i]['value_' + typeCode].push(value);
    }
    this.sellerDynamicData[i].checked =
      this.sellerDynamicData[i]['value_' + typeCode].length > 0 ? true : false;
  }

  groupTextList(event, i) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    const keyLength = event.target.value.length;
    if (
      typeCode !== 9 &&
      typeCode !== 17 &&
      typeCode !== 16 &&
      typeCode !== 10 &&
      typeCode !== 11
    ) {
      console.log('aabbb');
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
      console.log('aa');
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
        console.log('ABV');
        const urlValid = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        if (urlValid.test(event.target.value)) {
          this.sellerDynamicData[i]['value_' + typeCode] = event.target.value;
          this.sellerDynamicData[i].validUrl = 2;
          this.urlValidMsg = false;
        } else {
          this.sellerDynamicData[i].validUrl = 1;
          this.urlValidMsg = true;
        }
      }
    }
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

  fileChangeEvent(event: any, i): void {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].errMsg = false;
    if (!this.sellerDynamicData[i]['value_' + typeCode]) {
      this.sellerDynamicData[i]['value_' + typeCode] = [];
    }
    this.openDialog(event, i);
  }

  imageUploader = (
    item: any,
    response: string,
    status: number,
    headers: any
  ): any => {
    const cloudinaryImage = JSON.parse(response);
    const list = {
      img: cloudinaryImage.secure_url,
      cloudinaryPublicId: cloudinaryImage.public_id,
      containerHeight: cloudinaryImage.height,
      containerWidth: cloudinaryImage.width,
    };
    this.videoData = cloudinaryImage.secure_url;

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
      // this.sellerDynamicData[this.videoIndex][
      //   'value_' + this.videoTypecode
      // ].push({
      //   videoLink: cloudinaryImage.secure_url,
      //   seqId:
      //     this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
      //       .length + 1,
      // });
      // this.sellerDynamicData[this.videoIndex].checked =
      //   this.sellerDynamicData[this.videoIndex]['value_' + this.videoTypecode]
      //     .length > 0
      //     ? true
      //     : false;
      // this.sellerDynamicData[this.videoIndex].isLoading = false;
    }
  };
  imageUploaders = (
    item: any,
    response: string,
    status: number,
    headers: any
  ): any => {
    const cloudinaryImage = JSON.parse(response);
  };
  // cloudinary end
  // cloudinary video end

  uploadIconFile(event, i, typecode) {
    console.log(event, i, typecode);
    // document.getElementsByClassName('view_' + i)[0].innerHTML = 'View';
    // document.getElementsByClassName('viewClose_' + i)[0].innerHTML = 'X';
    // document
    //   .getElementsByClassName('chooseView_' + i)[0]
    //   .setAttribute('style', 'margin-left: 0px');
    this.docIndex = i;
    this.docTypecode = typecode;
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
    this.videoUpload = true;
    this.uploader.uploadAll();
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

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        this.listAsset = res.data;
        // this.addForm.controls.assetTypeId.setValidators(Validators.required);
        // this.addForm.controls.assetTypeId.updateValueAndValidity();
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
        res.data[0].details.map(x => {
          x.attributes.map(y => {
            console.log('yyyyyyyyyyyyyyyyy->', y);
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
      x.attributes.sort((a, b) => a.seqId - b.seqId);
    });
    this.listGroup = data;
  }

  reasonaddForm() {
    this.formObj.userId = new FormControl('', [Validators.required]);
    // this.formObj.pin = new FormControl('', [Validators.required]);
    this.formObj.dateOfBirth = new FormControl('', [Validators.required]);
    this.formObj.firstName = new FormControl('', [Validators.required]);
    this.formObj.lastName = new FormControl('', [Validators.required]);
    // this.formObj.dropDownData = new FormControl('', [Validators.required]);

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

  sellerSubmit(data: any) {
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
    const invalid = [];
    const controls = this.addForm.controls;
    // for (const name in controls) {
    for (const name of Object.keys(controls)) {
      if (controls[name].invalid) {
        console.log(name);
        this.showToast('top-right', 'mandatory fields are missing', 'danger');
        // this.showToast('top-right', name + ' fields are missing!', 'danger');
        return;
        // if(name==='userId'){
        //   names = 'User';
        // }else if(name==='dateOfBirth'){
        //   names = 'Date of Birth';
        // }else if (name==='firstName'){
        //   names = 'First Name';
        // }else if (name==='lastName'){
        //   names = 'Last Name';
        // }
        invalid.push(name);
      }
    }
    if (this.addForm.invalid) {
      return;
    }

    this.locationCheck = document.getElementsByClassName('locationCheck');
    const dataObject = {
      userid: data.userId._id,
      attributes: {
        dateOfBirth: data.dateOfBirth,
        firstname: data.firstName,
        lastname: data.lastName,
        data: this.sellerDynamicData,
      },
    };
    console.log('dataObject', dataObject);
    this.service.sellerPost(dataObject).subscribe(
      (res: any) => {
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
  }

  // remove videos start
  removeVideo(i, k) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i]['value_' + typeCode].splice(k, 1);
  }
  // remove video end

  // remove doc start
  removeDocument(i, typecode, k) {
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
  // remove doc end

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
        if (res) {
          this.uploadFiless(res, 0, data, i);
        }
      });
  }

  uploadFile(e, i) {
    const typeCode = this.sellerDynamicData[i].typeCode;
    this.sellerDynamicData[i].isLoading = true;
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
        this.sellerDynamicData[i]['value_' + typeCode].push({
          imageLink: data.Location,
          seqId: this.sellerDynamicData[i]['value_' + typeCode].length + 1,
        });
        this.sellerDynamicData[i].isLoading = false;
        this.sellerDynamicData[i].checked =
          this.sellerDynamicData[i]['value_' + typeCode].length > 0
            ? true
            : false;
      });
    }
    return false;
  }

  openDialogs(data, i) {
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
        if (res) {
          this.uploadFiless(res, 0, data, i);
        }
      });
  }

  seqId() {
    return this.seqIds++;
  }

  uploadFiless(image, val, event?, i?) {
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
  // document upload end

  // document upload start
  uploadDocuments(image, val, typecode) {
    switch (val) {
      case 0:
        this.isLoading = true;
        const data = {
          docLink: image,
        };
        this.docs = data;
    }
    if (this.sellerDynamicData[val]['value_' + typecode]) {
      this.sellerDynamicData[val]['value_' + typecode] = this.docs;
    }
  }
  // document upload end

  removeImgs(k) {
    this.imagesUrl.splice(k, 1);
    (document.getElementById('imageUpload') as HTMLInputElement).value = '';
  }

  locationSearch(event, val, typecode?) {
    const typecodes = typecode;
    const iIndex = val;
    this.locationCheck = event;
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

      this.locationAddress = place.name;
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
          }
        }
      }
    });
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
        }
      });
  }
  rangeValidation(min, max) {
    this.options.floor = min;
    this.options.ceil = max;
    this.options.step = 1;
  }
  numericalType(data) {
    // console.log(data);
    if (data) {
      return data.split('-')[1];
    }
  }
  /**
   * @param * event
   * @description only return numeric value
   * @returns // number // 244
   */
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  dateP(event, i, j) {
    console.log(event.value, i, j);
    const year = moment(event.value, 'DD/MM/YYYY').year();

    this.sellerDynamicData[i].value_12 = year;
  }

  getDob(e) {
    console.log(e);
    const arr = Object.keys(e).map(k => e[k]);

    if (arr[0].dateOfBirth) {
      const momentDOB = moment(arr[0].dateOfBirth).format('YYYY-MM-DD');
      this.addForm.controls.dateOfBirth.setValue(momentDOB);
    } else {
      this.addForm.controls.dateOfBirth.setValue('');
    }
  }
  // checkvalidate = false;
  // beforeSubmitMandotaryCount = 0;
  // textValidation(event,mandatory,typeCode){

  //   console.log('event,mandatory,i',typeCode);
  //   let checkvalidate = false
  //   console.log(this.afterGetApiMandatoryCount);
  //   switch(typeCode) {

  //     case 1:
  //       if(mandatory && event.target.value){
  //         }
  //       // code block
  //       break;
  //     case 2:
  //       if(mandatory && event.target.value){

  //       }
  //       // code block
  //       break;
  //       case 7:
  //         if(mandatory && event.target.value){

  //         }

  //         // code block
  //         break;
  //         case 9:
  //         if(mandatory && event.target.value){

  //         }
  //         break;
  //         case 17:
  //           if(mandatory && event.target.value){

  //           }
  //     default:
  //       // code block
  //   }

  //    console.log(this.checkvalidate);
  // }
}
