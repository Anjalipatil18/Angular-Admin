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
// src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component
import { ImageCropperDialogComponent } from '../../../../../../app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';
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
  selector: 'app-search-tag-add',
  templateUrl: './search-tag-add.component.html',
  styleUrls: ['./search-tag-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class SearchTagAddComponent implements OnInit {
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
    private toastrService: NbToastrService
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
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  listGroup = [];
  userDataVal = false;
  editAssetId: any;
  editSubId: any;
  editSubSubId: any;
  errMsg: any;
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

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  testDate: any;
  private index = 0;
  lat: any;
  long: any;
  locAddress: any;
  items = [];
  listUsers: any;
  currencies = [];
  unitsList = [];
  currencySymbol: any;
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
      this.statusCode = params.sCode;
      this.assetId = params.id;
    });
    this.languageActive();
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
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description post the form data
   * @date 2020-02-05
   * @param * formData fetched data from form
   */
  addSearchTags(formData: any) {
    console.log('formData*********--------', formData);
    const langNameunitnName = {};
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNameunitnName[i.languageCode] =
          formData['searchtagsname_' + i.languageCode];
      }
    }

    // this.submitted = true;
    const list = {
      searchTag: langNameunitnName,
    };
    console.log('list', list);
    this.service.searchTagsPostList(list).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast(
          'top-right',
          'Search tags added successfully!',
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
