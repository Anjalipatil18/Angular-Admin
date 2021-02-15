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
import { FaqService } from '../../../service/faq.service';
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
export class FaqEditViewComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: FaqService,
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
  parentIds: any;
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
  sCatId: any;
  imgErrMsg: any;
  hasScat = false;
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

  reasonaddForm() {
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

          this.formObj['title_' + x.languageCode] = new FormControl('');
          this.formObj['description_' + x.languageCode] = new FormControl('');
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addForm.controls[
            'title_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'title_' + this.langSelectors[index].languageCode
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

  getFaqEdit() {
    const list = {
      id: this.assetId,
    };
    this.service.getfaqEdit(list).subscribe((res: any) => {
      console.log(
        'Object.keys(res.data[0].title  **********',
        Object.keys(res.data[0].title)
      );
      for (const i of Object.keys(res.data[0].title)) {
        console.log('i**********', i);
        const indx = this.langSelectors.findIndex(
          val => val.languageCode === i
        );
        console.log('[indx]*********', indx);
        this.langSelectors[indx].active = true;
        this.addForm.controls['title_' + i].setValue(res.data[0].title[i]);
        this.addForm.controls['description_' + i].setValue(
          res.data[0].htmlContent[i]
        );
      }
    });
  }

  ngOnInit() {
    this.languageActive();
    this.route.params.subscribe(params => {
      console.log('params faq edit view -----', params);
      this.assetId = params.id;
      if (params.parentId) {
        this.parentIds = params.parentId;
      }
    });

    this.getFaqEdit();
  }

  reportCheckbox(event, i, lang) {
    console.log(event, i, lang);
    this.errMsg = false;
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addForm.controls['title_' + lang].setValidators(Validators.required);
      this.addForm.controls['description_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['title_' + lang].updateValueAndValidity();
      this.addForm.controls['description_' + lang].updateValueAndValidity();
    } else {
      this.addForm.controls['title_' + lang].setValidators(null);
      this.addForm.controls['title_' + lang].updateValueAndValidity();
      this.addForm.controls['title_' + lang].setValue('');
      this.addForm.controls['description_' + lang].setValidators(null);
      this.addForm.controls['description_' + lang].updateValueAndValidity();
      this.addForm.controls['description_' + lang].setValue('');
    }
    this.userDataVal = true;
    // this.validation()
    // console.log('thisadduserform', this.addForm.value);
  }

  faqPatchEditSubmit(data: any) {
    console.log('submitFaq', data);
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    const langNametitle = {};
    const langNameDescription = {};
    // for(let i=0; i<this.langSelectors.length; i++){
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNametitle[i.languageCode] = data['title_' + i.languageCode];
        langNameDescription[i.languageCode] =
          data['description_' + i.languageCode];
      }
    }

    const lang = 'en';
    let datas;
    if (langNameDescription[lang] === '') {
      datas = {
        title: langNametitle,
        id: this.assetId,
      };
    } else {
      datas = {
        title: langNametitle,
        htmlContent: langNameDescription,
        id: this.assetId,
      };
    }

    console.log('00000000000000000000', datas);
    this.service.patchFaqlist(datas, this.parentIds).subscribe(
      (res: any) => {
        this.location.back();
        console.log('*********addFaqlist********', res);
      },
      error => {
        console.log(error);
      }
    );
    // const cat = {
    //   userType: 1,
    //   hasScat: this.sCatId !== '1' ? true : this.hasScat,
    //   supportTextId: this.supportTextId,
    //   subCatId: this.sCatId,
    // };
    // for (const prop in data) {
    //   if (data[prop]) {
    //     cat[prop] = data[prop];
    //   }
    // }

    // if (this.sCatId === this.supportTextId || this.sCatId === '1') {
    //   delete cat.supportTextId;
    //   delete cat.subCatId;
    // }

    // if (this.supportTextId !== '1') {
    //   cat.supportTextId = this.supportTextId;
    // }

    // console.log('cat', cat);
    // const id = this.supportTextId !== this.sCatId ? this.supportTextId : '';
    // console.log('id------------------>', id, cat);
    // this.service.addSupportUserList(cat, id).subscribe(
    //   (res: any) => {
    //     this.location.back();
    //     console.log(res);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  hasSubCat(event) {
    // console.log('event', event)
    this.hasScat = event.target.checked;
    if (this.hasScat) {
      this.langSelectors.map(x => {
        if (x.active) {
          this.addForm.controls['description_' + [x.languageCode]].setValue('');
        }
      });
    }
  }
}
