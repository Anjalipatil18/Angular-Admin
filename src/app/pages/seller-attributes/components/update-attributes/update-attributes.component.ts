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
import { AttributesService } from './../service/attributes.service';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';
// import * as moment from 'moment';
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
import { Moment } from 'moment';
import * as _moment from 'moment';

import { NgSelectConfig } from '@ng-select/ng-select';
import { NbToastrService } from '@nebular/theme';

import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';

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

@Component({
  selector: 'app-update-attributes',
  templateUrl: './update-attributes.component.html',
  styleUrls: ['./update-attributes.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class UpdateAttributesComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: AttributesService,
    private conf: Configuration,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private configSelect: NgSelectConfig,
    private toastrService: NbToastrService,
    private cloudinary: Cloudinary
  ) {
    this.configSelect.notFoundText = 'No units found!';
  }

  get f() {
    return this.addForm.controls;
  }
  addForm: FormGroup;
  submitted = false;
  attributeId: any;
  listLang: any;
  userData: any;
  userDataVal = false;
  errMsg: any;
  typeMinMax: number;

  variable = 1;
  langSelectors = [];
  formObj = {
    titleTag: new FormControl(),
    typeCode: new FormControl(),
    typeText: new FormControl(),
    icon: new FormControl(),
    mandatory: new FormControl(),
    filterable: new FormControl(),
    ratable: new FormControl(),
    showOnProfile: new FormControl(),
    documentTypeCode: new FormControl(''),
    isAutoApproved: new FormControl(''),
    noOfDocumentsAllowed: new FormControl(''),
    expiryNeeded: new FormControl(''),
    expiryDate: new FormControl(''),
  };
  profilePicIcon: any;
  isLoadingIcon = false;

  // doc type for drop down in document type select

  docType = [
    { id: 1, name: 'PDF' },
    { id: 2, name: 'IMAGE' },
    { id: 3, name: 'DOCTYPE' },
    // {id: 4, name: 'Pabradė',disabled: true},
    // {id: 5, name: 'Klaipėda'}
  ];

  private index = 0;

  showExpiryDate = false;

  // cloudinary start
  uploaderOptions: FileUploaderOptions = {
    url: `https://api.cloudinary.com/v1_1/${
      this.cloudinary.config().cloud_name
    }/image/upload`,
    autoUpload: true,
    isHTML5: true,
    removeAfterUpload: true,
    headers: [{ name: 'X-Requested-With', value: 'XMLHttpRequest' }],
  };
  uploader: FileUploader;
  uploaders: FileUploader;

  listType = [
    { type: 1, title: 'Text Box' },
    { type: 2, title: 'Text Area' },
    { type: 3, title: 'Range Slider' },
    { type: 4, title: 'Check Box' },
    { type: 5, title: 'Radio Button' },
    { type: 6, title: 'Drop Down' },
    { type: 7, title: 'Location' },
    { type: 8, title: '+/- controller' },
    { type: 9, title: 'Numerical Input box' },
    { type: 10, title: 'Datetime Field' },
    { type: 11, title: 'Date Field' },
    { type: 12, title: 'Year Field' },
    { type: 13, title: 'Image Upload' },
    { type: 14, title: 'Video Upload' },
    { type: 15, title: 'True/False Toggle' },
    { type: 16, title: 'Document' },
    // {type:16, title:'Brands & Models'}
  ];
  bool = [
    { id: true, name: 'true' },
    { id: false, name: 'false' },
  ];

  unitsList = [];
  numeric = 'Select Numeric';
  // get units list end

  imageVideoPlaceholder: any;
  selectedDocumentType: any;
  unitMinValue: any;
  unitValue: any;

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

  groupTextList(event) {
    console.log('event', event.target.value);
  }
  isExpiryNeededChecked(event) {
    console.log('event checked', event);
    event ? (this.showExpiryDate = true) : (this.showExpiryDate = false);
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

    this.profilePicIcon = cloudinaryImage.secure_url;
    this.addForm.get('icon').setValue(cloudinaryImage.secure_url);
    this.isLoadingIcon = false;
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
  // cloudinary end

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.attributeId = params.id;
      const title = this.attributeId === '1' ? 'Add' : 'Edit';
      const breadcrumb = { attrTitle: title };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
    this.languageActive();
    this.getUnitsList();

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
          this.formObj['title_' + [x.languageCode]] = new FormControl('');
          this.formObj['valueMin_' + [x.languageCode]] = new FormControl('');
          this.formObj['valueMax_' + [x.languageCode]] = new FormControl('');
          this.formObj['unitMin_' + [x.languageCode]] = new FormControl('');
          this.formObj['unitMax_' + [x.languageCode]] = new FormControl('');
          this.formObj['numericalType_' + [x.languageCode]] = new FormControl(
            ''
          );
          this.formObj['values_' + [x.languageCode]] = new FormControl('');

          this.formObj['documentName_' + [x.languageCode]] = new FormControl(
            ''
          );
          this.formObj.documentTypeCode = new FormControl('');
          this.formObj.isAutoApproved = new FormControl('');
          this.formObj.noOfDocumentsAllowed = new FormControl('');
          this.formObj.expiryNeeded = new FormControl('');
          this.formObj.expiryDate = new FormControl('');
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
        }

        if (this.attributeId !== '1') {
          this.getEditForm();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /* edit form value */
  getEditForm() {
    this.service.attributesListEdit(this.attributeId).subscribe(
      (res: any) => {
        console.log('resresres', res);
        this.userData = res.result[0];
        const resEdit = res.result[0].title;
        for (const prop in resEdit) {
          if (resEdit[prop]) {
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
          }
        }
        this.typeSelect(this.userData.typeCode, true);
        this.addForm.controls.titleTag.setValue(this.userData.titleTag);
        // this.addForm.controls['typeCode'].setValue(this.userData.typeCode);
        // this.addForm.controls['typeText'].setValue(this.userData.typeText);
        this.addForm.controls.mandatory.setValue(this.userData.mandatory);
        this.addForm.controls.filterable.setValue(this.userData.filterable);
        this.addForm.controls.ratable.setValue(this.userData.ratable);
        this.addForm.controls.showOnProfile.setValue(
          this.userData.showOnProfile
        );
        this.addForm.get('icon').setValue(this.userData.icon);

        this.profilePicIcon = this.userData.icon;
        this.langSelectors.map(x => {
          if (x.active) {
            this.addForm.controls['title_' + [x.languageCode]].setValue(
              this.userData['title_' + [x.languageCode]]
            );
            if (
              this.userData.typeCode === 4 ||
              this.userData.typeCode === 5 ||
              this.userData.typeCode === 6
            ) {
              const value = 'values_' + [x.languageCode];
              console.log(value);
              this.addForm.controls['values_' + [x.languageCode]].setValue(
                this.userData[value]
              );
            } else if (
              this.userData.typeCode === 1 ||
              this.userData.typeCode === 2 ||
              this.userData.typeCode === 8 ||
              this.userData.typeCode === 13 ||
              this.userData.typeCode === 14
            ) {
              const valueMin = 'valueMin_' + [x.languageCode];
              const valueMax = 'valueMax_' + [x.languageCode];
              this.addForm.controls['valueMin_' + [x.languageCode]].setValue(
                this.userData[valueMin]
              );
              this.addForm.controls['valueMax_' + [x.languageCode]].setValue(
                this.userData[valueMax]
              );
            } else if (this.userData.typeCode === 3) {
              const valueMin = 'valueMin_' + [x.languageCode];
              const valueMax = 'valueMax_' + [x.languageCode];
              const unitMin = 'unitMax_' + [x.languageCode];
              console.log(this.userData[`unitMax_${x.languageCode}`]);
              // this.addForm.controls.unitMin_[x.languageCode].setValue(this.userData[unitMin]);
              this.addForm.controls['unitMin_' + [x.languageCode]].setValue(
                this.userData[`unitMax_${x.languageCode}`]
              );
              this.addForm.controls[`unitMax_${x.languageCode}`].setValue(
                this.userData[unitMin]
              );
              this.addForm.controls['valueMin_' + [x.languageCode]].setValue(
                this.userData[`valueMin_${x.languageCode}`]
              );
              this.addForm.controls['valueMax_' + [x.languageCode]].setValue(
                this.userData[`valueMax_${x.languageCode}`]
              );
            } else if (this.userData.typeCode === 9) {
              this.typeSelectValue(this.userData.typeCode, this.userData);

              // let unitMin = 'numericalType_' + [x.languageCode];
              // this.addForm.controls['numericalType_' + [x.languageCode]].setValue(
              //   this.userData.numericalType_en.name
              // );
              this.addForm.controls['valueMin_' + [x.languageCode]].setValue(
                this.userData[`valueMin_${x.languageCode}`]
              );
              this.addForm.controls['valueMax_' + [x.languageCode]].setValue(
                this.userData[`valueMax_${x.languageCode}`]
              );
            }
          }
        });
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
      this.addForm.controls['title_' + lang].setValidators(Validators.required);
      this.addForm.controls['title_' + lang].updateValueAndValidity();
    } else {
      this.addForm.controls['title_' + lang].setValidators(null);
      this.addForm.controls['title_' + lang].updateValueAndValidity();
      this.addForm.controls['title_' + lang].setValue('');
    }
    this.userDataVal = true;
    this.validation();
  }

  reasonaddForm() {
    this.formObj.titleTag = new FormControl('', [Validators.required]);
    this.formObj.typeCode = new FormControl('', [Validators.required]);
    this.formObj.typeText = new FormControl('');
    this.formObj.icon = new FormControl('');
    this.formObj.mandatory = new FormControl(false, [Validators.required]);
    this.formObj.filterable = new FormControl(false, [Validators.required]);
    this.formObj.ratable = new FormControl(false, [Validators.required]);
    this.formObj.showOnProfile = new FormControl(false, [Validators.required]);
    this.addForm = this.formBuilder.group(this.formObj);
  }

  getUsers(data: any) {
    console.log('submit data--------->', data);
    data.typeCode === 16
      ? (data.typeCode = 18)
      : (data.typeCode = data.typeCode);
    this.submitted = true;
    this.errMsg = false;
    this.langSelectors.map(x => {
      if (x.active) {
        if (
          Number(data['valueMin_' + [x.languageCode]]) >
          Number(data['valueMax_' + [x.languageCode]])
        ) {
          this.addForm.controls['valueMax_' + [x.languageCode]].setValue('');
          this.errMsg =
            'Conditions(' +
            x.language +
            ') Min value must be greater than max value';
        }
      }
    });
    const invalid = [];
    const controls = this.addForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    if (this.addForm.invalid) {
      invalid.length > 0
        ? this.showToast(
            'top-right',
            invalid + ' fields are missing!',
            'danger'
          )
        : this.showToast('top-right', invalid + ' field is missing!', 'danger');
      return;
    }
    const unit = {
      mandatory: false,
      filterable: false,
      ratable: false,
      showOnProfile: false,
      languageCode: null,
      typeCode: null,
      isAutoApproved: null,
      expiryNeeded: null,
      expiryDate: null,
      noOfDocumentsAllowed: null,
    };
    const getOjectValue = false;
    for (const prop in data) {
      if (data[prop]) {
        if (typeof data[prop] !== 'object') {
          this.langSelectors.map(x => {
            if (x.active) {
              const propString1 = prop;
              const propString = propString1.split('_');
              unit[propString[0] + '_' + x.languageCode] = unit[
                propString[0] + '_' + x.languageCode
              ]
                ? data[propString[0] + '_' + x.languageCode]
                : (unit[prop] = data[prop]);
            }
          });
        } else {
          if (!getOjectValue) {
            this.langSelectors.map(x => {
              if (x.active) {
                const propString1 = prop;
                const propString = propString1.split('_');
                unit[propString[0] + '_' + x.languageCode] =
                  data[propString[0] + '_' + x.languageCode];
              }
            });
          }
          // getOjectValue = true;
        }
      }
    }
    unit.mandatory = data.mandatory;
    unit.filterable = data.filterable;
    unit.ratable = data.ratable;
    unit.showOnProfile = data.showOnProfile;
    if (this.typeMinMax === 5) {
      unit.typeCode = 18;
    }

    if (unit.typeCode === 18) {
      unit.isAutoApproved = data.isAutoApproved;
      unit.noOfDocumentsAllowed = data.noOfDocumentsAllowed;
      if (data.expiryNeeded) {
        unit.expiryNeeded = data.expiryNeeded;
      } else {
        unit.expiryNeeded = false;
      }
      if (data.expiryDate) {
        unit.expiryDate = data.expiryDate;
      } else {
        unit.expiryDate = false;
      }
    }

    console.log('submit data', unit);
    this.service.addAtrribute(unit, this.attributeId).subscribe(
      (res: any) => {
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
  }

  minMaxIndex(index) {
    if (
      index === 1 ||
      index === 2 ||
      index === 8 ||
      index === 13 ||
      index === 14
    ) {
      this.typeMinMax = 1;
    } else if (index === 3) {
      this.typeMinMax = 2;
    } else if (index === 4 || index === 5 || index === 6) {
      this.typeMinMax = 3;
    } else if (index === 9) {
      this.typeMinMax = 4;
    } else if (index === 16) {
      this.typeMinMax = 6;
    } else if (index === 18) {
      this.typeMinMax = 6;
    } else {
      this.typeMinMax = 0;
    }
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
        this.unitsList = unitsArray;
      },
      error => {
        console.log(error);
      }
    );
  }
  // for select dropDown type code
  getSelectValue(val) {
    return val === 15 ? (val = val + 1) : (val = val + 1);
  }
  // when type is selected this function is called
  typeSelect(index, data) {
    if (index === 18) {
      if (this.userData.expiryNeeded) {
        this.showExpiryDate = this.userData.expiryNeeded;
      }
      this.imageVideoPlaceholder = this.listType[15].title.split(' ')[0];
      this.langSelectors.map(x => {
        if (x.active) {
          this.addForm.controls['documentName_' + [x.languageCode]].setValue(
            this.userData[`documentName_${x.languageCode}`]
          );
        }
      });
      const docIndex = this.docType.findIndex(
        arr =>
          arr.name.toLowerCase() === this.userData.documentType.toLowerCase()
      );
      if (docIndex !== -1) {
        this.selectedDocumentType = this.docType[docIndex].id;
        this.addForm.controls.documentTypeCode.setValue(
          this.docType[docIndex].id
        );
      }
      this.addForm.controls.isAutoApproved.setValue(
        this.userData.showOnProfile
      );
      this.addForm.controls.noOfDocumentsAllowed.setValue(
        this.userData.noOfDocumentsAllowed
      );
      this.addForm.controls.expiryNeeded.setValue(this.userData.expiryNeeded);
      this.addForm.controls.expiryDate.setValue(this.userData.expiryDate);
    } else {
      this.imageVideoPlaceholder = this.listType[index - 1].title.split(' ')[0];
    }
    this.numeric = 'Select Numeric';
    this.errMsg = false;
    this.userDataVal = data;
    if (index === 18) {
      this.addForm.controls.typeText.setValue(this.listType[15].title);
      this.addForm.controls.typeCode.setValue(this.listType[15].type);
    } else {
      this.addForm.controls.typeText.setValue(this.listType[index - 1].title);
      this.addForm.controls.typeCode.setValue(this.listType[index - 1].type);
    }
    this.minMaxIndex(index);

    // this.validation();
  }

  typeSelectValue(index, data) {
    console.log(index, data);
    if (index === 9) {
      this.langSelectors.map(x => {
        if (x.active) {
          this.addForm.controls[`numericalType_${x.languageCode}`].setValue(
            (this.numeric = this.userData[`numericalType_${x.languageCode}`])
          );
        }
      });
    } else if (index === 8) {
      this.langSelectors.map(x => {
        if (x.active) {
          this.addForm.controls[`numericalType_${x.languageCode}`].setValue(
            (this.unitMinValue = this.userData[
              `numericalType_${x.languageCode}`
            ])
          );
        }
      });
    }
  }

  unitminchange(event) {
    this.unitValue = event.name;
  }
  validation() {
    this.langSelectors.map(x => {
      if (
        (this.typeMinMax === 1 ||
          this.typeMinMax === 2 ||
          this.typeMinMax === 4) &&
        x.active
      ) {
        this.addForm.controls['valueMin_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls['valueMax_' + [x.languageCode]].setValidators(
          null
        );
      } else {
        this.addForm.controls['valueMin_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls['valueMax_' + [x.languageCode]].setValidators(
          null
        );
      }

      if (this.typeMinMax === 2 && x.active) {
        this.addForm.controls['unitMin_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls['unitMax_' + [x.languageCode]].setValidators(
          null
        );
      } else {
        this.addForm.controls['unitMin_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls['unitMax_' + [x.languageCode]].setValidators(
          null
        );
      }

      if (this.typeMinMax === 3 && x.active) {
        this.addForm.controls['values_' + [x.languageCode]].setValidators(null);
      } else {
        this.addForm.controls['values_' + [x.languageCode]].setValidators(null);
      }

      if (this.typeMinMax === 4 && x.active) {
        this.addForm.controls[
          'numericalType_' + [x.languageCode]
        ].setValidators(null);
      } else {
        this.addForm.controls[
          'numericalType_' + [x.languageCode]
        ].setValidators(null);
      }

      // document

      if (this.typeMinMax === 5 && x.active) {
        this.addForm.controls['documentName_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls.documentTypeCode.setValidators(null);
        this.addForm.controls.isAutoApproved.setValidators(null);
        this.addForm.controls.noOfDocumentsAllowed.setValidators(null);
        this.addForm.controls.expiryNeeded.setValidators(null);
        this.addForm.controls.expiryDate.setValidators(null);
      } else {
        this.addForm.controls['documentName_' + [x.languageCode]].setValidators(
          null
        );
        this.addForm.controls.documentTypeCode.setValidators(null);
        this.addForm.controls.isAutoApproved.setValidators(null);
        this.addForm.controls.noOfDocumentsAllowed.setValidators(null);
        this.addForm.controls.expiryNeeded.setValidators(null);
        this.addForm.controls.expiryDate.setValidators(null);
      }

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

      /* add new form value */
      const valueMin = this.addForm.value['valueMin_' + [x.languageCode]];
      const valueMax = this.addForm.value['valueMax_' + [x.languageCode]];
      const unitMin = this.addForm.value['unitMin_' + [x.languageCode]];

      const unitMax = this.addForm.value['unitMax_' + [x.languageCode]];
      const numericalType = this.addForm.value[
        'numericalType_' + [x.languageCode]
      ];
      const values = this.addForm.value['values_' + [x.languageCode]];

      /* add && edit form value */
      this.addForm.controls['valueMin_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['valueMin_' + [x.languageCode]]
          : this.userDataVal && x.active && valueMin
          ? valueMin
          : ''
      );
      this.addForm.controls['valueMax_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['valueMax_' + [x.languageCode]]
          : this.userDataVal && x.active && valueMax
          ? valueMax
          : ''
      );
      this.addForm.controls['unitMin_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['unitMin_' + [x.languageCode]]
          : this.userDataVal && x.active && unitMin
          ? unitMin
          : ''
      );
      this.addForm.controls['unitMax_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['unitMax_' + [x.languageCode]]
          : this.userDataVal && x.active && unitMax
          ? unitMax
          : ''
      );
      this.addForm.controls['numericalType_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['numericalType_' + [x.languageCode]]
          : this.userDataVal && x.active && numericalType
          ? numericalType
          : ''
      );
      this.addForm.controls['values_' + [x.languageCode]].setValue(
        this.userDataVal && this.userData
          ? this.userData['values_' + [x.languageCode]]
          : this.userDataVal && x.active && values
          ? values
          : ''
      );
    });
  }

  back() {
    this.location.back();
  }
  seqId() {
    return this.seqIds++;
  }

  uploadIconFile(e) {
    this.uploader.uploadAll();
    // this.isLoadingIcon = true;
    // var bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    // const dt = moment().valueOf();
    // var fileName;
    // if (this.addForm.controls.titleTag.value) {
    //   fileName = this.addForm.controls.titleTag.value;
    // } else {
    //   fileName = 'sellerAttribute';
    // }
    // if (file) {
    //   var params = { Key: fileName.split(' ').join('-') + '_' + dt + '_' + this.seqId() + '.jpg', ContentType: file.type, Body: file };
    //   bucket.upload(params, (err, data) => {
    //     this.profilePicIcon = data.Location;
    //     this.addForm.get('icon').setValue(data.Location);
    //     this.isLoadingIcon = false;
    //   });
    // }
    // return false;
  }
}
