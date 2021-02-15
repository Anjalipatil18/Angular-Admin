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
import { SearchtagService } from '../../service/searchtag.service';
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
  selector: 'app-search-tag-edit',
  templateUrl: './search-tag-edit.component.html',
  styleUrls: ['./search-tag-edit.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class SearchTagEditComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: SearchtagService,
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
  formObj = {};

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
      console.log('params getEditSearchTags edit view -----', params);
      // this.statusCode = params.sCode;
      this.assetId = params.id;
      // this.statusType = params.statusType;
    });
  }

  reportCheckbox(event, i, lang) {
    console.log(event, i, lang);
    this.errMsg = false;
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addForm.controls['searchtagsname_' + lang].setValidators(
        Validators.required
      );
      this.addForm.controls['searchtagsname_' + lang].updateValueAndValidity();
    } else {
      this.addForm.controls['searchtagsname_' + lang].setValidators(null);
      this.addForm.controls['searchtagsname_' + lang].updateValueAndValidity();
      this.addForm.controls['searchtagsname_' + lang].setValue('');
    }
    this.userDataVal = true;
    // this.validation()
    // console.log('thisadduserform', this.addForm.value);
  }

  getEditSearchTags(id) {
    const list = {
      tagid: id,
    };

    this.service.getEditSearchTagData(list).subscribe((res: any) => {
      console.log('edit getEditSearchTagData **********', res.data[0]);
      const arrayone = Object.keys(res.data[0].searchTag);
      for (const i of arrayone) {
        const indx = this.langSelectors.findIndex(
          val => val.languageCode === i
        );
        this.langSelectors[indx].active = true;
        this.addForm.controls['searchtagsname_' + i].setValue(
          res.data[0].searchTag[i]
        );
      }
    });
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

          this.formObj['searchtagsname_' + [x.languageCode]] = new FormControl(
            ''
          );
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addForm.controls[
            'searchtagsname_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addForm.controls[
            'searchtagsname_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }
        this.getEditSearchTags(this.assetId);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description patch the form data
   * @date 2020-02-05
   * @param * data fetched form data
   */
  editSearchTags(data: any) {
    console.log('formData*********--------', data);
    const langNameunitnName = {};
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNameunitnName[i.languageCode] =
          data['searchtagsname_' + i.languageCode];
      }
    }

    // this.submitted = true;
    const list = {
      id: this.assetId,
      searchTag: langNameunitnName,
    };
    console.log('list', list);
    this.service.searchTagsPatch(list).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast(
          'top-right',
          'Search tags edited successfully!',
          'success'
        );
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error.error.message);
      }
    );
  }
}
