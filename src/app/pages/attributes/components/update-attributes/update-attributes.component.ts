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
import * as moment from 'moment';
import { Buffer } from 'buffer';
import { Observable, of } from 'rxjs';

import { NgSelectConfig } from '@ng-select/ng-select';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UsertagsDialogComponent } from '../usertags-dialog/usertags-dialog.component';

import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';

declare var AWS: any;

@Component({
  selector: 'app-update-attributes',
  templateUrl: './update-attributes.component.html',
  styleUrls: ['./update-attributes.component.scss'],
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
    private dialogService: NbDialogService,
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
  addedmodbradiv: any = [];
  langSelectors = [];
  showFilterType = false;
  formObj = {
    titleTag: new FormControl(),
    typeCode: new FormControl(),
    typeText: new FormControl(),
    icon: new FormControl(),
    mandatory: new FormControl(),
    filterable: new FormControl(),
    ratable: new FormControl(),
    brands: new FormControl(),
  };
  profilePicIcon: any;
  isLoadingIcon = false;

  private index = 0;

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
    { type: 16, title: 'Brands & Models' },
    { type: 17, title: 'URL' },
  ];

  limit = 10;
  totRecords: any;
  paginationIndex = 0;
  brandsList: any;
  models = [];
  // get brands list end

  postBrandsList = [];

  unitsList = [];
  numeric = 'Select Numeric';
  // get units list end

  imageVideoPlaceholder: any;
  unitMinValue: any;
  unitValue: any;

  seqIds = 1;

  showView = false;

  allBrands = [];
  allBrandsData: { drag?: any; content?: any } = {
    drag: null,
    content: null,
  };

  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(
      msg || 'failed!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
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
    this.getAllModels();

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
        console.log('language', res);
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

          // this.formObj['valuea_'+[x.languageCode]] = new FormControl("");
          // this.formAttibutes();
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
        this.addedmodbradiv.push({
          index: this.addedmodbradiv.length,
          langSelectors: this.langSelectors,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  // edit form value
  getEditForm() {
    this.service.attributesListEdit(this.attributeId).subscribe(
      (res: any) => {
        console.log('attributes/attributeId', res);
        this.userData = res.result[0];
        const resEdit = res.result[0].title;
        if (this.userData.brands) {
          if (this.userData.brands.length > 0) {
            this.showView = true;
          }
        }
        // if(res.result[0]['brandIds'].length > 0) {
        //   this.allBrandsData ? this.allBrandsData['content']['drag'] = res.result[0]['brandIds'] : '';
        // }
        for (const prop in resEdit) {
          if (resEdit[prop]) {
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
          }
        }

        if (this.userData.filterable && this.userData.filterTypeCode) {
          this.onChangeUiSwitch(this.userData.filterable);
          this.showFilterType = true;
          this.addForm.controls.filterableTypeCode.setValue(
            this.userData.filterTypeCode
          );
          this.addForm.controls.filterTypeCodeMsg.setValue(
            this.userData.filterTypeCodeMsg
          );
        }
        this.typeSelect(this.userData.typeCode, true);
        this.addForm.controls.titleTag.setValue(this.userData.titleTag);
        this.addForm.controls.typeCode.setValue(this.userData.typeCode);

        this.addForm.controls.typeText.setValue(this.userData.typeText);
        this.addForm.controls.mandatory.setValue(this.userData.mandatory);
        this.addForm.controls.filterable.setValue(this.userData.filterable);
        this.addForm.controls.ratable.setValue(this.userData.ratable);
        this.addForm.get('icon').setValue(this.userData.icon);
        this.profilePicIcon = this.userData.icon;
        this.langSelectors.map(x => {
          if (x.active) {
            this.addForm.controls['title_' + [x.languageCode]].setValue(
              this.userData['title_' + [x.languageCode]]
            );
          }
        });
        console.log('-------------->', this.addForm, this.userData);
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
    // console.log('thisadduserform', this.addForm.value);
  }

  reasonaddForm() {
    // let urlValidation = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    this.formObj.titleTag = new FormControl('', [Validators.required]);
    this.formObj.typeCode = new FormControl('', [Validators.required]);
    this.formObj.typeText = new FormControl('');

    this.formObj.icon = new FormControl('');
    this.formObj.mandatory = new FormControl(false, [Validators.required]);
    this.formObj.filterable = new FormControl(false, [Validators.required]);
    this.formObj.ratable = new FormControl(false, [Validators.required]);
    this.formObj.brands = new FormControl(false, [Validators.required]);
    // this.formObj['url'] = new FormControl("", [Validators.pattern(urlValidation)]);
    this.addForm = this.formBuilder.group(this.formObj);
    // this.addForm.controls['brandIds'].setValue(this.models);
    this.getBrandsList();
  }
  // get brands list start
  getBrandsList(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'active',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.getBrandsList(list, event).subscribe(
      (res: any) => {
        // console.log('get brands response: ', res);
        this.totRecords = res.data.length;
        this.brandsList = res.data;
        res.data.map((data, index) => {
          // console.log('data.name', data.name);
          const val = data.name ? this.models.push(res.data[index].name) : '';
        });
        // this.addForm.controls['brandIds'].setValue(this.models);
        // console.log('brandsList---->', this.models, typeof this.models);
      },
      error => {
        this.models = [];
        console.log(error);
      }
    );
  }
  onAdd(event) {
    this.models.push(event.value);
    const index = this.brandsList.findIndex(arr => arr.name === event.value);
    if (index !== -1) {
      this.postBrandsList.push(this.brandsList[index]._id);
    }
    // this.addForm.controls['brandIds'].setValue(this.models);
  }
  onRemove(event) {
    // let index = this.models.findIndex(arr => arr == event);
    // index != -1 ? this.models.splice(index, 1) : '';
    const index = this.models.findIndex(arr => arr === event);
    if (index !== -1) {
      this.models.splice(index, 1);
    }
  }

  public requestAutocompleteItemsFake = (
    text: string
  ): Observable<string[]> => {
    return of(this.models);
  };

  getUsers(datas: any) {
    //  console.log('-----------data---------',data);
    const val =
      this.allBrandsData &&
      this.allBrandsData.drag &&
      this.allBrandsData.drag.map(data => {
        // this.postBrandsList.push(data._id);
        this.postBrandsList.push({
          id: data._id,
          code: '',
          name: data.brands_en,
          symbol: '',
        });
      });
    // console.log('inputdata', data)
    datas.brands = [];
    this.submitted = true;
    this.errMsg = false;
    // console.log('this.langSelectors', this.langSelectors)
    this.langSelectors.map(x => {
      if (x.active) {
        if (
          Number(datas['valueMin_' + [x.languageCode]]) >
          Number(datas['valueMax_' + [x.languageCode]])
        ) {
          this.addForm.controls['valueMax_' + [x.languageCode]].setValue('');
          this.errMsg =
            'Conditions(' +
            x.language +
            ') Min value must be greater than max value';
        }
      }
    });

    // console.log(this.addForm)
    const invalid = [];
    // console.log('form controls', this.addForm.controls)
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
      brands: null,
    };
    // for(const prop in data){
    //   if(data[prop]){
    //     unit[prop] = data[prop];
    //   }
    // }
    const getOjectValue = false;
    // alert(getOjectValue);
    for (const prop in datas) {
      if (datas[prop]) {
        // console.log('typeof data[prop]', typeof data[prop],data[prop])
        if (typeof datas[prop] !== 'object') {
          this.langSelectors.map(x => {
            if (x.active) {
              const propString1 = prop;
              const propString = propString1.split('_');
              //  console.log('propString', propString)
              // const typetext = data['typeText'].split(' ');
              // const typeString = (typetext[0].toLowerCase()) + 'Type_' + x.languageCode ;
              unit[propString[0] + '_' + x.languageCode] = unit[
                propString[0] + '_' + x.languageCode
              ]
                ? datas[propString[0] + '_' + x.languageCode]
                : (unit[prop] = datas[prop]);
            }
          });
          // unit[prop] = data[prop];
        } else {
          // console.log(data[prop]);
          // console.log(getOjectValue);
          // console.log(getOjectValue);
          if (!getOjectValue) {
            this.langSelectors.map(x => {
              if (x.active) {
                const propString1 = prop;
                // console.log(propString1);
                const propString = propString1.split('_');
                // console.log('propString object', propString)
                // const typetext = data['typeText'].split(' ');
                // const typeString = (typetext[0].toLowerCase()) + 'Type_' + x.languageCode ;
                // console.log('----------------------', propString[0])
                unit[propString[0] + '_' + x.languageCode] =
                  datas[propString[0] + '_' + x.languageCode];
              }
            });
            // getOjectValue = true
          }
        }
      }
    }
    // console.log('this.addForm', this.addForm, data, unit)
    unit.mandatory = datas.mandatory;
    unit.filterable = datas.filterable;
    unit.brands = this.postBrandsList;
    const filterTypeCode = 'filterTypeCode';
    const filterTypeCodeMsg = 'filterTypeCodeMsg';
    if (datas.filterableTypeCode) {
      unit[filterTypeCode] = datas.filterableTypeCode;
    }

    if (datas.filterTypeCodeMsg) {
      unit[filterTypeCodeMsg] = datas.filterTypeCodeMsg;
    }

    console.log('before sending data---->', unit);
    this.service.addAtrribute(unit, this.attributeId).subscribe(
      (res: any) => {
        this.location.back();
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  // public requestAutocompleteItems = (text: string): Observable<any> => {
  //   const url = `https://api.github.com/search/repositories?q=${text}`;
  //   return this.http
  //       .get<any>(url)
  //       .pipe(map(items => items.map(item => item.full_name)));
  // }

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
      this.typeMinMax = 5;
    } else if (index === 17) {
      this.typeMinMax = 6;
    } else {
      this.typeMinMax = 0;
    }

    // switch(index) {
    //   case 1 || 2 || 8 || 13 || 14 : this.typeMinMax = 1; break;
    //   case 3 : this.typeMinMax = 2; break;
    //   case 4 || 5 || 6 : this.typeMinMax = 3; break;
    //   case 9 : this.typeMinMax = 4; break;
    //   case 16 : this.typeMinMax = 5; break;
    //   case 17 : this.typeMinMax = 6; break;
    //   default: this.typeMinMax = 0; break;
    // }
  }
  // get units list start
  getUnitsList() {
    const list = {
      offset: 0,
      limit: 500,
    };
    this.service.getUnitsList(list).subscribe(
      (res: any) => {
        this.unitsList = res.data.units;
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
        console.log(this.unitsList);
      },
      error => {
        console.log(error);
      }
    );
  }
  typeSelect(index, data) {
    this.imageVideoPlaceholder = this.listType[index - 1].title.split(' ')[0];
    this.numeric = 'Select Numeric';
    this.errMsg = false;
    this.userDataVal = data;
    this.addForm.controls.typeText.setValue(this.listType[index - 1].title);
    this.minMaxIndex(index);
    this.validation();
  }

  unitminchange(event, languageCode) {
    console.log('event', event);
    // this.unitValue = event.name;

    this.addForm.controls[`unitMax_${languageCode}`].setValue(event.name);

    // this.unitMinValue = event.name;
  }

  numericSelector(event) {
    console.log(event);
  }
  validation() {
    this.langSelectors.map(x => {
      // console.log(x.languageCode, this.typeMinMax);

      if (
        (this.typeMinMax === 1 ||
          this.typeMinMax === 2 ||
          this.typeMinMax === 4) &&
        x.active
      ) {
        // this.addForm.controls['valueMin_'+[x.languageCode]].setValidators(Validators.required);
        // this.addForm.controls['valueMax_'+[x.languageCode]].setValidators(Validators.required);
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
        const val = this.addForm.controls['unitMin_' + [x.languageCode]];
        const vals = this.addForm.controls['unitMax_' + [x.languageCode]];
      } else {
        const vals = this.addForm.controls['unitMin_' + [x.languageCode]];
        const val = this.addForm.controls['unitMax_' + [x.languageCode]];
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

      if (this.typeMinMax === 5 && x.active) {
        // this.addForm.controls['valuea_'+[x.languageCode]].setValidators(null);
      } else {
        // this.addForm.controls['valuea_'+[x.languageCode]].setValidators(null);
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

      // this.addForm.controls['valuea_'+[x.languageCode]].updateValueAndValidity();

      //  add new form value
      const valueMin = this.addForm.value['valueMin_' + [x.languageCode]];
      const valueMax = this.addForm.value['valueMax_' + [x.languageCode]];
      const unitMin = this.addForm.value['unitMin_' + [x.languageCode]];
      // this.unitValue = this.addForm.value['unitMin_'+[x.languageCode]];
      console.log(
        'unit selected value',
        this.addForm.value['unitMin_' + [x.languageCode]],
        this.addForm.value['unitMin_' + [x.languageCode]]
      );
      const unitMax = this.addForm.value['unitMax_' + [x.languageCode]];
      const numericalType = this.addForm.value[
        'numericalType_' + [x.languageCode]
      ];
      const valuess = this.addForm.value['values_' + [x.languageCode]];

      // const valuea_ = this.addForm.value['valuea_'+[x.languageCode]];
      if (this.userData && this.userData['numericalType_' + [x.languageCode]]) {
        console.log(this.userData['numericalType_' + [x.languageCode]]);
        this.numeric = this.userData['numericalType_' + [x.languageCode]];
      }

      //  add && edit form value
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
          : this.userDataVal && x.active && valuess
          ? valuess
          : ''
      );
      // this.addForm.controls['valuea_'+[x.languageCode]].setValue(this.userDataVal && this.userData?this.userData['valuea_'+[x.languageCode]]:this.userDataVal && x.active && valuea_? valuea_:'');
    });
  }

  back() {
    this.location.back();
  }
  seqId() {
    return this.seqIds++;
  }

  uploadIconFile1(e) {
    this.uploader.uploadAll();
    this.isLoadingIcon = true;
  }

  uploadIconFile(e) {
    this.uploader.uploadAll();
    this.isLoadingIcon = true;
    // var bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    // const dt = moment().valueOf();
    // console.log('image upload---->', e);
    // console.log('this.addForm', this.addForm.controls.titleTag.value);
    // var fileName;
    // if(this.addForm.controls.titleTag.value) {
    //   fileName = this.addForm.controls.titleTag.value;
    // } else {
    //   fileName = 'attribute';
    // }
    // // fileName = e.target.files[0].name.split('.')[0];
    // if (file) {
    //   var params = { Key: fileName.split(' ').join('-')+'_'+dt+'_'+this.seqId()+'.jpg', ContentType: file.type, Body: file };
    //   bucket.upload(params, (err, data) => {
    //     console.log(data);
    //     this.profilePicIcon = data.Location;
    //     this.addForm.get('icon').setValue(data.Location);
    //     this.isLoadingIcon = false;
    //   });
    // }
    // return false;
  }
  modbradiv(index, caseValue) {
    switch (caseValue) {
      case 1: // adding box
        this.addedmodbradiv.push({
          index: this.addedmodbradiv.length,
          langSelectors: this.langSelectors,
        });
        break;

      case 2: // deleteing box
        const indx = this.addedmodbradiv.findIndex(
          item => item.index === index
        );
        const vals = indx > -1 ? this.addedmodbradiv.splice(indx, 1) : '';
        break;
    }
  }
  openDialog(data) {
    console.log('this.allBrandsData', this.allBrandsData);
    this.getAllModels();
    this.dialogService
      .open(UsertagsDialogComponent, {
        context: {
          action: false,
          title: 'User Details',
          content: this.allBrandsData,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
        hasBackdrop: false,
      })
      .onClose.subscribe(res => {
        console.log('res', res);
        if (res !== 'undefined') {
          const vals = this.allBrandsData.drag
            ? ''
            : (this.allBrandsData.drag = res);
          this.showView = true;
        } else {
          this.showView = false;
        }
        //  if(res){
        //    this.listTable.emit(1);
        //    this.statusId = [];
        //    this.userActive=[];
        //  }
      });
  }
  // get brands
  getAllModels(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: 500,
      status: 'active',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.modelsList(list, event).subscribe(
      (res: any) => {
        console.log('get brands response: ', res);
        this.allBrands = res.data;
        this.allBrandsData.content = res.data;
      },
      error => {
        this.allBrands = [];
        console.log(error);
      }
    );
  }

  /**
   * @param * event take true false value
   * @description if value true and the field is empty that time add validation
   * @returns validators
   */
  onChangeUiSwitch(event) {
    console.log(event);

    if (event) {
      this.showFilterType = true;
      const validators = [Validators.required];
      this.addForm.addControl(
        'filterableTypeCode',
        new FormControl('', validators)
      );
      this.addForm.addControl('filterTypeCodeMsg', new FormControl(''));
    } else {
      this.showFilterType = false;
      this.addForm.removeControl('filterableTypeCode');
      this.addForm.removeControl('filterTypeCodeMsg');
    }
    this.addForm.updateValueAndValidity();
  }
  // get filterableTypeCode() {
  //   return this.addForm.get('filterableTypeCode') as FormControl;
  // }

  //
  //   @param {*} index //  take index+1 of data
  //   @description on change filterable code type get name and save into text field for send to backend
  //   @returns set title in input type text box
  //   @memberof UpdateAttributesComponent

  typeSelectFilterable(index, data) {
    console.log(index);
    this.addForm.controls.filterTypeCodeMsg.setValue(
      this.listType[index - 1].title
    );
  }
}
