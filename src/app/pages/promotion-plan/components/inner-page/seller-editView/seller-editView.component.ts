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
    // planname: new FormControl(),
    plantype: new FormControl(),
    currencyplan: new FormControl(),
    priceplan: new FormControl(),
    validitydays: new FormControl(),
    validityhours: new FormControl(),
    plancoverage: new FormControl(),
  };

  errMsg: any;
  userDataVal = false;
  editDataView: any;
  lat: any;
  long: any;
  selectedValidityHours: any;
  hideUrgentListing = false;
  img = [];
  currencySymbol: any;
  statusType: any;
  verifiedTextMessage: any;
  validityHoursNo: any;
  limit = 10;
  paginationIndex = 0;
  editSubSubId: any;
  userId: any;
  profilePicIcon: any;
  sellerDynamicData = [];
  listPlanType = [];
  listPlanCoverage = [];
  validityHoursList = [];
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

  maxDate = moment(new Date()).format('YYYY-MM-DD');
  imagesLinks: any;
  duplicateCheckboxData = [];
  duplicateCheckboxValues = [];
  listUsers: any;
  currencies = [];
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

  docUpload = false;
  docIndex: any;
  docTypecode: any;

  videoIndex: any;
  videoTypecode: any;

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
    this.languageActive();
    this.route.params.subscribe(params => {
      console.log('params promotion plan edit view -----', params);
      // this.statusCode = params.sCode;
      this.assetId = params.id;
      // this.statusType = params.statusType;
    });
    // breadcrumb update
    if (this.assetId !== 1) {
      this.getEditUnit(this.assetId);
    } else {
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    }
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

  getEditUnit(id, event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'Active',
      userId: id,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    console.log('list **********', list);
    this.service.purchasePlanEdit(list).subscribe(
      (res: any) => {
        console.log('edit purchasePlanList **********', res.data[0]);
        for (const i of Object.keys(res.data[0].name)) {
          console.log('i**********', i);
          const indx = this.langSelectors.findIndex(
            val => val.languageCode === i
          );
          console.log('[indx]*********', indx);
          this.langSelectors[indx].active = true;
          this.addForm.controls['planname_' + i].setValue(res.data[0].name[i]);
          this.addForm.controls['description_' + i].setValue(
            res.data[0].name[i]
          );
        }

        const indxType = this.listPlanType.findIndex(
          val => val.name === res.data[0].typeText
        );
        if (this.listPlanType[indxType].id === 2) {
          this.hideUrgentListing = true;
          this.addForm.controls.plantype.setValue(this.listPlanType[indxType]);
        } else {
          this.hideUrgentListing = false;
          this.addForm.controls.plantype.setValue(this.listPlanType[indxType]);
          this.addForm.controls.plancoverage.setValue(
            res.data[0].coverageScope
          );
        }

        this.addForm.controls.currencyplan.setValue(res.data[0].currency);
        this.addForm.controls.priceplan.setValue(res.data[0].amount);
        this.addForm.controls.validitydays.setValue(res.data[0].validity.days);
        this.addForm.controls.validityhours.setValue(
          res.data[0].validity.hours
        );
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

  /**
   * @description put if condition for coverageScope for urgent listing
   * @date 2020-02-05
   * @param * data its form data
   */
  promotionPatchEditSubmit(data: any) {
    console.log('data edit', data);
    const langNameplanName = {};
    const langNameDescription = {};

    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNameplanName[i.languageCode] = data['planname_' + i.languageCode];
        langNameDescription[i.languageCode] =
          data['description_' + i.languageCode];
      }
    }
    // this.submitted = true;
    let list;
    if (data.plancoverage === false) {
      list = {
        id: this.assetId,
        name: langNameplanName,
        type: data.plantype.name || data.plantype,
        currency: data.currencyplan.name || data.currencyplan,
        amount: data.priceplan,
        validity: {
          days: data.validitydays,
          hours: data.validityhours.name || data.validityhours,
        },
        coverageScope: data.plancoverage.name,
        description: langNameDescription,
      };
    } else {
      list = {
        id: this.assetId,
        name: langNameplanName,
        type: data.plantype.name || data.plantype,
        currency: data.currencyplan.name || data.currencyplan,
        amount: data.priceplan,
        validity: {
          days: data.validitydays,
          hours: data.validityhours.name || data.validityhours,
        },
        coverageScope: data.plancoverage.name || data.plancoverage,
        description: langNameDescription,
      };
    }

    console.log('list edit', list);
    this.service.addPatchPromotion(list).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast('top-right', 'Plan edited successfully!', 'success');
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error.error.message);
      }
    );
  }
}
