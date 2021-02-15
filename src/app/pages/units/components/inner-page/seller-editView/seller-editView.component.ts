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
import { UnitsService } from '../../service/units.service';
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
    private service: UnitsService,
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
    unitName: new FormControl(),
    symbolName: new FormControl(),
  };

  editDataView: any;
  lat: any;
  long: any;
  img = [];
  userDataVal = false;
  errMsg: any;
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
      console.log('params units edit view -----', params);
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
  }

  reportCheckbox(event, i, lang) {
    console.log(event, i, lang);
    this.errMsg = false;
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addForm.controls['unitName_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['unitName_' + lang].updateValueAndValidity();
    } else {
      this.addForm.controls['unitName_' + lang].setValidators(null);
      this.addForm.controls['unitName_' + lang].updateValueAndValidity();
      this.addForm.controls['unitName_' + lang].setValue('');
    }
    this.userDataVal = true;
    // this.validation()
    // console.log('thisadduserform', this.addForm.value);
  }

  getEditUnit(id, event?) {
    const eve = event && event.page ? event.page - 1 : 0;

    const list = {
      offset: eve * 10,
      limit: this.limit,
      status: 1,
      userId: id,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.unitsList(list, event).subscribe((res: any) => {
      console.log('edit unitsList **********', res.data[0]);
      for (const i of Object.keys(res.data[0].name)) {
        const indx = this.langSelectors.findIndex(
          val => val.languageCode === i
        );
        this.langSelectors[indx].active = true;
        this.addForm.controls['unitName_' + i].setValue(res.data[0].name[i]);
      }
      this.addForm.controls.symbolName.setValue(res.data[0].unit);
    });
  }

  reasonaddForm() {
    // this.formObj.unitName = new FormControl('', [Validators.required]);
    this.formObj.symbolName = new FormControl('', [Validators.required]);
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

          this.formObj['unitName_' + [x.languageCode]] = new FormControl('');
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addForm.controls[
            'unitName_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'unitName_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  unitPatchEditSubmit(data: any) {
    const langNameunitnName = {};
    //  for(let i = 0; i<this.langSelectors.length;i++){
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNameunitnName[i.languageCode] = data['unitName_' + i.languageCode];
      }
    }

    // this.submitted = true;
    const list = {
      id: this.assetId,
      name: langNameunitnName,
      unit: data.symbolName,
    };
    this.service.unitsPatchList(list).subscribe(
      (res: any) => {
        console.log('units pacth edit', res);
        this.location.back();
        this.showToast('top-right', 'Unit Edited successfully!', 'success');
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error.error.message);
      }
    );
  }
}
