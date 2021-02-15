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
import { TagsService } from '../../service/tags.service';
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
  selector: 'app-tags-add',
  templateUrl: './tags-add.component.html',
  styleUrls: ['./tags-add.component.scss'],
  providers: [
    {
      provide: DateTimeAdapter,
      useClass: MomentDateTimeAdapter,
      deps: [OWL_DATE_TIME_LOCALE],
    },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class TagsAddComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private service: TagsService,
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
  public start: CalendarView = 'Decade';
  public depth: CalendarView = 'Decade';
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();

  public maxDate = new Date(this.today);
  // public minDate : Date = new Date ("05/17/1800");
  public format = 'yyyy';

  submitted = false;
  addForm: FormGroup;
  assetId: any;
  statusCode: any;
  selectedVehicle: any;
  formObj = {
    userId: new FormControl(),
    title: new FormControl(),
    currency: new FormControl(),
    location: new FormControl(),
    price: new FormControl(),
    // marketplace: new FormControl(),
    sold: new FormControl(),
    negotiable: new FormControl(),
    exchange: new FormControl(),
    assetTypeId: new FormControl(),
    assetSubtypeId: new FormControl(),
    assetSubSubTypeId: new FormControl(),
    units: new FormControl(),
    titleSeo: new FormControl(),
    metaTags: new FormControl(),
    slug: new FormControl(),
    description: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    addressLine: new FormControl(),
    area: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),

    // taxes
    taxes: new FormControl(),
    assetCondition: new FormControl(),
    // ad descriptions
    adDescription: new FormControl(),
  };
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
  facebookImagesUrl = [];
  twitterImagesUrl = [];
  ogImagesUrl = [];
  isLoading = false;
  facebookIsLoading = false;
  twitterIsLoading = false;
  ogIsLoading = false;
  imgErrMsg: any;
  addressData: any;
  brandsModelData: any;

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  taxesConfig = {
    displayKey: 'taxName', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  assetConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };
  testDate: any;
  private index = 0;

  // location variables
  lat: any;
  long: any;
  city: any;
  state: any;
  country: any;
  addressLine: any;
  area: any;
  postalCode: number;
  locAddress: any;

  items = [];
  listUsers: any;
  listTaxes: any;
  listAssetCondition = [];
  currencies = [];
  unitsList = [];
  currencySymbol: any;
  unitsSymbol: any;
  curWithVal = '1234';
  formErrMsg = false;
  urlValidMsg = false;
  seqIds = 1;

  /**
   * @author Bhavesh jain
   * @param event Event from nb-select
   */
  // selectedVehicle: any;
  selectBrnads: any;
  brandsArray = [];

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
    this.getTaxesList();
    this.getUserList();
    this.reasonaddForm();
    this.languageActive();
    this.getCurrencyList();
    this.getUnitsList();
    this.listAssetCondition = [{ name: 'New' }, { name: 'Used' }];
  }

  // seo meta tags update chips
  onSelect(event) {}
  onAdd(event) {
    this.items.push(event.value);
  }
  onRemove(event) {
    const index = this.items.findIndex(arr => arr === event);
    const val = index !== -1 ? this.items.splice(index, 1) : '';
  }
  onBlur(event) {}

  numericalType(data) {
    return data;
    // return data.split('-')[1];
  }

  getUserList() {
    const list = {
      query: '',
      trigger: 3,
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
        this.getAllAsset();
      },
      error => {
        console.log(error);
      }
    );
  }
  // get units list end

  // get taxes api
  getTaxesList() {
    const list = {
      status: 'Active',
    };
    this.service.taxesGetList(list).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.listTaxes = res.data;
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
  // get units list end

  // change currency
  selectCurrency(event) {}

  getAllAsset() {
    this.service.assetList().subscribe(
      (res: any) => {
        this.listAsset = res.data;
        this.addForm.controls.assetTypeId.setValidators(Validators.required);
        this.addForm.controls.assetTypeId.updateValueAndValidity();
        if (this.assetId !== '1') {
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

  setTitle(event) {
    this.addForm.controls.titleSeo.setValue(event.target.value);

    let slug = event.target.value;
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    this.addForm.controls.slug.setValue('website.lopongo.com/' + slug);
  }
  setDescription(event) {
    this.addForm.controls.description.setValue(event.target.value);
  }

  getAssetList() {
    const list = {
      statusCode: this.statusCode,
      assetId: this.assetId,
    };
    this.service.assetGetList(list).subscribe(
      (res: any) => {
        res.result.details.map(x => {
          x.attributes.map(y => {
            if (y.typeCode === 12) {
              const ctrlValue = moment();
              ctrlValue.year(y.value_12);
              y.values_12 = ctrlValue;
            }
          });
        });
        const getAsset = res.result;
        console.log(getAsset);
        // for (let index = 0; index < getAsset.details.length; index++) {

        //   for (let jIndex = 0; jIndex < getAsset.details[index].attributeslength; jIndex++) {
        //    if(typeCode)

        //   }

        // }

        getAsset.details.map((attributesGroups, i) => {
          return attributesGroups.attributes.map((attribute, j) => {
            if (attribute.typeCode === 16 && attribute.value_16[1]) {
              this.service.getModel(attribute.value_16[0]).subscribe(
                (response: any) => {
                  this.listGroup[i].attributes[j].model = response.data;
                  console.log(this.listGroup);
                },
                error => {
                  console.log(this.listGroup);
                  console.log(error);
                }
              );
            }
          });
        });

        this.lat = getAsset.location.lat;
        this.long = getAsset.location.long;
        // this.imagesUrl = getAsset.images
        this.reOrderGroup(getAsset.details);

        const userIndex =
          this.listUsers &&
          this.listUsers.findIndex(x => x._id === getAsset.userId);
        // console.log(userIndex)
        if (userIndex > -1) {
          this.addForm.controls.userId.setValue(this.listUsers[userIndex]);
        }
        this.imagesUrl = getAsset.images ? getAsset.images : [];
        if (getAsset.seoSettings) {
          this.addForm.controls.titleSeo.setValue(
            getAsset.seoSettings.titleSeo ? getAsset.seoSettings.titleSeo : ''
          );
          this.addForm.controls.metaTags.setValue(
            getAsset.seoSettings.metaTags
              ? getAsset.seoSettings.metaTags
              : getAsset.seoSettings.metaTags
          );
          this.addForm.controls.slug.setValue(
            getAsset.seoSettings.slug ? getAsset.seoSettings.slug : ''
          );
          this.addForm.controls.description.setValue(
            getAsset.seoSettings.description
              ? getAsset.seoSettings.description
              : ''
          );
          this.addForm.controls.adDescription.setValue(
            getAsset.seoSettings.description
              ? getAsset.seoSettings.description
              : ''
          );
          this.facebookImagesUrl = getAsset.seoSettings.facebookImg
            ? getAsset.seoSettings.facebookImg
            : '';
          this.twitterImagesUrl = getAsset.seoSettings.twitterImg
            ? getAsset.seoSettings.twitterImg
            : '';
          this.ogImagesUrl = getAsset.seoSettings.openGraph
            ? getAsset.seoSettings.openGraph
            : '';
        }
        this.addForm.controls.title.setValue(getAsset.title);
        this.addForm.controls.currency.setValue(getAsset.units);
        this.currencySymbol = getAsset.units
          ? getAsset.units.currency_code + ' - ' + getAsset.units.symbol
          : '';
        this.addForm.controls.location.setValue(getAsset.locationName);
        this.addForm.controls.area.setValue(getAsset.area);
        this.addForm.controls.addressLine.setValue(getAsset.address);
        this.addForm.controls.city.setValue(getAsset.city);
        this.addForm.controls.country.setValue(getAsset.country);
        this.addForm.controls.state.setValue(getAsset.state);
        this.addForm.controls.postalCode.setValue(getAsset.zip);
        this.addForm.controls.price.setValue(getAsset.price);
        this.addForm.controls.assetCondition.setValue(getAsset.assetCondition);
        this.addForm.controls.taxes.setValue(getAsset.taxes);
        // this.addForm.controls.marketplace.setValue(
        //   getAsset.marketPlaceStatusCode === 1 ? true : false
        // )
        // this.addForm.controls.sold.setValue(
        //   getAsset.soldStatusCode === 1 ? true : false
        // )
        this.addForm.controls.negotiable.setValue(getAsset.isNegotiable);
        this.addForm.controls.exchange.setValue(getAsset.availableForExchange);
        this.editAssetId = getAsset.assetTypeId || undefined;
        this.editSubId = getAsset.assetSubTypeId || undefined;
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
    this.listGroup = this.assetId === '1' ? [] : this.listGroup;
    if (data.hasSubType) {
      const list = {
        assetSubtype: data._id,
      };
      this.service.assetSubList(list).subscribe(
        (res: any) => {
          // console.log('resres', res);
          this.listSubAsset = res.data;
          this.listSubSubAsset = [];
          this.addForm.controls.assetSubtypeId.setValidators(
            Validators.required
          );
          this.addForm.controls.assetSubtypeId.updateValueAndValidity();
          if (this.assetId !== '1') {
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
    // console.log('asdasdadadadadadadadadadadaada aeadada dadad ada', data);
    this.listGroup = this.assetId === '1' ? [] : this.listGroup;
    if (data.hasSubType) {
      const list = {
        assetSubSubtype: data._id,
      };
      this.service.assetSubSubList(list).subscribe(
        (res: any) => {
          // console.log('asdasdasdadadsa');
          this.listSubSubAsset = res.data;
          // console.log('this.listSubSubAsset', this.listSubSubAsset);
          this.addForm.controls.assetSubSubTypeId.setValidators(
            Validators.required
          );
          this.addForm.controls.assetSubSubTypeId.updateValueAndValidity();
          if (this.assetId !== '1') {
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
          // console.log('asdasd', res);
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
        att.validUrl = 0;
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
    this.formObj.userId = new FormControl('', [Validators.required]);
    this.formObj.title = new FormControl('', [Validators.required]);
    this.formObj.currency = new FormControl('', [Validators.required]);
    this.formObj.location = new FormControl('', [Validators.required]);
    this.formObj.price = new FormControl('', [Validators.required]);
    this.formObj.sold = new FormControl(false, [Validators.required]);
    // this.formObj.marketplace = new FormControl(false, [Validators.required])
    this.formObj.negotiable = new FormControl(false, [Validators.required]);
    this.formObj.exchange = new FormControl(false, [Validators.required]);
    this.formObj.assetTypeId = new FormControl({
      value: '',
      disabled: false,
    });
    this.formObj.assetSubtypeId = new FormControl({
      value: '',
      disabled: false,
    });
    this.formObj.assetSubSubTypeId = new FormControl({
      value: 'numericalType',
      disabled: false,
    });
    this.formObj.units = new FormControl({ value: '', disabled: false });
    this.formObj.titleSeo = new FormControl({ value: '', disabled: false });
    this.formObj.metaTags = new FormControl({ value: '', disabled: false });
    this.formObj.slug = new FormControl({ value: '', disabled: false });
    this.formObj.description = new FormControl({
      value: '',
      disabled: false,
    });
    this.formObj.city = new FormControl('', [Validators.required]);
    this.formObj.postalCode = new FormControl('', [Validators.required]);
    this.formObj.addressLine = new FormControl('', [Validators.required]);
    this.formObj.area = new FormControl('', [Validators.required]);
    this.formObj.state = new FormControl('', [Validators.required]);
    this.formObj.country = new FormControl('', [Validators.required]);

    // taxes
    this.formObj.taxes = new FormControl('');
    // ad descriptions
    this.formObj.adDescription = new FormControl({
      value: '',
      disabled: false,
    });
    this.addForm = this.formBuilder.group(this.formObj);
  }

  getUsers(data: any) {
    this.submitted = true;
    let dataVal = false;
    console.log('data', data);
    // this.submitted = true;
    // let dataVal = false;

    this.imgErrMsg =
      this.imagesUrl && this.imagesUrl.length > 0
        ? false
        : 'image field is required!';
    this.listGroup.map((x, index) => {
      x.attributes.map(y => {
        if (y.hasOwnProperty('checked')) {
          if (y.mandatory && !y.checked) {
            y.errMsg = true;
            dataVal = true;
          }
        } else {
          if (y.mandatory) {
            y.errMsg = true;
            dataVal = true;
          }
        }
      });
    });

    const innerAttributes = [];
    this.listGroup.map(x => {
      x.attributes.map(y => {
        innerAttributes.push({
          _id: y._id,
          value: y['value_' + y.typeCode],
        });
      });
    });
    const invalid = [];
    const controls = this.addForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    const allImages = [];
    console.log(this.imagesUrl);
    this.imagesUrl.map((imageUrl, index) => {
      let image;
      if (imageUrl.imageLink) {
        image = imageUrl.imageLink;
      } else {
        image = imageUrl.url;
      }
      allImages.push({
        url: image,
        seqId: index + 1,
      });
    });

    if (this.addForm.invalid) {
      this.showToast('top-right', invalid + ' fields are missing!', 'danger');
      return;
    }
    const currency = data.currency.name
      ? data.currency.name.split('-').map(s => s.trim())
      : data.currency.split('-').map(s => s.trim());
    let units;
    if (data.units) {
      units = data.units.name
        ? data.units.name.split('-').map(s => s.trim())
        : data.units.split('-').map(s => s.trim());
    }
    const metaTags = data.metaTags;

    const list = {
      title: data.title,
      adDescription: null,
      description: null,
      units: {
        currency_code: currency[0],
        symbol: currency[1],
      },
      price: data.price,

      images: allImages,
      userId: data.userId._id,
      assetTypeId:
        this.assetId === '1' ? data.assetTypeId._id : this.editAssetId,
      assetSubtypeId:
        this.assetId === '1' ? data.assetSubtypeId._id : this.editSubId,
      assetSubSubTypeId:
        this.assetId === '1' ? data.assetSubSubTypeId._id : this.editSubSubId,
      isPrivate: data.marketplace ? 0 : 1,
      isCreatedByAdmin: 1,
      // marketPlaceStatusCode: data.marketplace ? 1 : 0,
      sold: false,
      isAdmin: true,
      isNegotiable: data.negotiable,
      availableForExchange: data.exchange,
      details: this.listGroup,
      seoSettings: {
        titleSeo: data.titleSeo,
        metaTags,
        // : [
        //     trabajo,
        //     prueba
        // ],
        slug: data.slug,
        description: data.description,
        facebookImg: this.facebookImagesUrl,
        twitterImg: this.twitterImagesUrl,
        openGraph: this.ogImagesUrl,
      },
      lat: this.lat,
      long: this.long,
      locationName: data.location,
      assetCondition: data.assetCondition.name,
      address: data.addressLine,
      area: data.area,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.postalCode.toString(),
      // titleSeo: data.titleSeo,
      // metaTags,
      // slug: data.slug,
      // description: data.description,
      // facebookImg: this.facebookImagesUrl,
      // twitterImg: this.twitterImagesUrl,
      // openGraph: this.ogImagesUrl,
      taxes: data.taxes === '' ? [] : data.taxes,
    };
    if (data.adDescription) {
      list.adDescription = data.adDescription;
    }
    if (data.description) {
      list.description = data.description;
    }
    console.log('list', list);

    const list1 = {
      title: data.title,
      units: {
        code: currency[0],
        symbol: currency[1],
      },
      price: data.price,
      images: allImages,
      userId: data.userId._id,
      assetTypeId:
        this.assetId === '1' ? data.assetTypeId._id : this.editAssetId,
      assetSubtypeId:
        this.assetId === '1' ? data.assetSubtypeId._id : this.editSubId,
      assetSubSubTypeId:
        this.assetId === '1' ? data.assetSubSubTypeId._id : this.editSubSubId,
      isPrivate: data.marketplace ? 0 : 1,
      isCreatedByAdmin: 1,
      marketPlaceStatusCode: data.marketplace ? 1 : 0,
      isNegotiable: data.negotiable.toString(),
      availableForExchange: data.exchange.toString(),
      // details: allAttributes,
      lat: this.lat,
      long: this.long,
      locationName: data.location,
      address: data.addressLine,
      area: data.area,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.postalCode.toString(),
      titleSeo: data.titleSeo,
      metaTags,
      slug: data.slug,
      description: data.description,
      facebookImg: this.facebookImagesUrl,
      twitterImg: this.twitterImagesUrl,
      openGraph: this.ogImagesUrl,
      taxes: data.taxes === '' ? [] : data.taxes,
    };
    console.log(list, this.assetId);
    this.service.assetPostList(list, this.assetId).subscribe(
      (res: any) => {
        this.location.back();
        this.showToast('top-right', 'Ads added successfully!', 'success');
      },
      error => {
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
    console.log(this.listGroup);
    const typeCode = this.listGroup[i].attributes[j].typeCode;
    this.listGroup[i].attributes[j].errMsg = false;
    const keyLength = event.target.value.length;
    if (typeCode === 16) {
      this.listGroup[i].attributes[j]['value_' + typeCode] = event.target.value;
    }
    if (
      typeCode !== 9 &&
      typeCode !== 17 &&
      typeCode !== 16 &&
      typeCode !== 10 &&
      typeCode !== 11
    ) {
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
        typeCode !== 17 &&
        typeCode !== 16 &&
        typeCode !== 10 &&
        typeCode !== 11
      ) {
        if (
          event.target.value <
            Number(this.listGroup[i].attributes[j].valueMin.en) ||
          event.target.value >
            Number(this.listGroup[i].attributes[j].valueMax.en)
        ) {
          this.listGroup[i].attributes[j].colorCode = 1;
        } else {
          this.listGroup[i].attributes[j]['value_' + typeCode] =
            event.target.value;
          this.listGroup[i].attributes[j].colorCode = 2;
        }
      } else {
        const urlValid = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        if (urlValid.test(event.target.value)) {
          this.listGroup[i].attributes[j]['value_' + typeCode] =
            event.target.value;
          this.listGroup[i].attributes[j].validUrl = 2;
          this.urlValidMsg = false;
        } else {
          this.listGroup[i].attributes[j].validUrl = 1;
          this.urlValidMsg = true;
        }
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
    console.log(event);
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

  openDialogs(data, val, type?) {
    this.imgErrMsg = false;
    if (data.target.value) {
      this.dialogService
        .open(ImageCropperDialogComponent, {
          context: {
            type: type ? type : '',
            action: false,
            title: 'Cropper Image',
            content: data,
            ok: 'Submit',
            cancelT: 'Cancel',
          },
        })
        .onClose.subscribe(res => {
          if (res) {
            switch (val) {
              case 0:
                this.isLoading = true;
                break;
              case 1:
                this.facebookIsLoading = true;
                break;
              case 2:
                this.twitterIsLoading = true;
                break;
              case 3:
                this.ogIsLoading = true;
                break;
            }
            this.uploadFiless(res, val);
          }
        });
    }
  }

  seqId() {
    return this.seqIds++;
  }

  uploadFiless(image, val) {
    switch (val) {
      case 0:
        this.isLoading = true;
        this.imagesUrl.push({
          imageLink: image,
        });
        this.facebookImagesUrl = image;
        this.twitterImagesUrl = image;
        this.ogImagesUrl = image;
        this.isLoading = false;
        break;
      case 1:
        this.facebookIsLoading = true;
        this.facebookImagesUrl = image;
        this.facebookIsLoading = false;
        break;
      case 2:
        this.twitterIsLoading = true;
        this.twitterImagesUrl = image;
        this.twitterIsLoading = false;
        break;
      case 3:
        this.ogIsLoading = true;
        this.ogImagesUrl = image;
        this.ogIsLoading = false;
        break;
    }
  }

  removeImgs(k, val) {
    switch (val) {
      case 0:
        this.imagesUrl.splice(k, 1);
        (document.getElementById('imageUpload') as HTMLInputElement).value = '';
        break;
      case 1:
        this.facebookImagesUrl.splice(k, 1);
        (document.getElementById(
          'facebookImageUpload'
        ) as HTMLInputElement).value = '';
        break;
      case 2:
        this.twitterImagesUrl.splice(k, 1);
        (document.getElementById(
          'twitterImageUpload'
        ) as HTMLInputElement).value = '';
        break;
      case 3:
        this.ogImagesUrl.splice(k, 1);
        (document.getElementById('ogImageUpload') as HTMLInputElement).value =
          '';
        break;
    }
  }
  locationSearch(event, is?, js?) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      // blank all field
      this.addForm.controls.country.setValue('');
      this.addForm.controls.city.setValue('');
      this.addForm.controls.area.setValue('');
      this.addForm.controls.addressLine.setValue('');
      this.addForm.controls.state.setValue('');

      this.addForm.controls.location.setValue(place.name);
      const placelatlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.lat = place.geometry.location.lat();
      this.long = place.geometry.location.lng();
      this.locAddress = place.formatted_address;

      console.log('place.address_components===', place.address_components);
      // for (let i = 0; i < place.address_components.length; i++) {
      for (const i of place.address_components) {
        // for (let j = 0; j < i.types.length; j++) {
        for (const j of i.types) {
          console.log(j);
          if (j === 'country') {
            console.log('sdasd');
            this.addForm.controls.country.setValue(i.long_name);
          }
          if (j === 'administrative_area_level_1') {
            this.addForm.controls.state.setValue(i.long_name);
          }

          // if (j === 'sublocality_level_2') {
          //   this.addressData = i.long_name;
          // }
          if (j === 'locality') {
            this.addForm.controls.city.setValue(i.long_name);
          }
          if (j === 'postal_code') {
            this.addForm.controls.postalCode.setValue(i.long_name);
          }
          if (j === 'sublocality_level_2') {
            this.addressData = i.long_name;
            this.addForm.controls.area.setValue(this.addressData);
          }
          if (j === 'sublocality') {
            const address1 = i.long_name;
            console.log(this.addressData);
            console.log(address1);
            // if (this.addressData) {
            //   fulladdress = this.addressData;
            // }
            // if (address1) {
            //   if (fulladdress) {
            //     fulladdress += ', ' + address1;
            //   } else {
            //     fulladdress += address1;
            //   }
            // }
            this.addForm.controls.addressLine.setValue(address1);
          }
        }
      }
    });
  }
  locationSearchAttr(event, i?, j?) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr.nodeValue;

    const input = document.getElementById(id);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', () => {
      const typeCode = this.listGroup[i].attributes[j].typeCode;
      const place = autocomplete.getPlace();
      // this.addForm.controls.location.setValue(place.name)
      // const placelatlng = {
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // }
      // this.lat = place.geometry.location.lat()
      // this.long = place.geometry.location.lng()
      // this.locAddress = place.formatted_address

      // console.log('place.address_components===', place.name+','+place.formatted_address)
      if (typeCode === 7) {
        // console.log(event.target.value);
        this.listGroup[i].attributes[j]['value_' + typeCode] =
          event.target.value;
      }
    });
  }
  getModel(event, list, i, j) {
    this.brandsArray = [];
    this.brandsArray.splice(0, 0, event);
    this.listGroup[i].attributes[j].model = [];
    this.listGroup[i].attributes[j].value_16 = this.brandsArray;

    this.service.getModel(event).subscribe(
      (res: any) => {
        // if(res.data.length > 0){
        // res.data.name = event.name;
        // this.selectedVehicle = event.name;
        // }
        // console.log('res.data[0].name', res.data)
        // this.brandsModelData = res.data;

        this.listGroup[i].attributes[j].model = res.data;
        console.log(this.listGroup);
        // this.listGroup  = [...list]
        // this.listSubSubAsset = [];
        // this.listSubAsset = res.data;
        // this.listSubSubAsset = [];

        // this.addForm.controls.assetSubtypeId.updateValueAndValidity();
      },
      error => {
        console.log(this.listGroup);
        console.log(error);
        // this.listGroup[i]["attributes"][j]["model"]=[];
        // this.listGroup[i]["attributes"][j]["value_16"]=[event.name,""];
      }
    );
  }

  /**
   * @author Bhavesh jain
   * @param * event for takeing value
   * @param * list for get all group value
   * @param * i for main attribute group index
   * @param * j for attributes index
   * @description set value when post data from admin
   */
  getModelValue(event, list, i, j) {
    const atrrKey = 'attributes';
    const valuesixteen = 'value_16';
    console.log(event);
    this.brandsArray.splice(1, 1);
    this.brandsArray.splice(1, 0, event);
    this.listGroup[i].attributes[j].value_16 = this.brandsArray;
  }

  dateP(event, i, j) {
    const atrrKey = 'attributes';
    const valuetwelve = 'value_12';
    console.log(event.value, i, j);
    const year = moment(event.value, 'DD/MM/YYYY').year();

    this.listGroup[i][atrrKey][j][valuetwelve] = year;
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
