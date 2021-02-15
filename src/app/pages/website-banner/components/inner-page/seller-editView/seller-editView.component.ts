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
import { WebsiteBannerService } from '../../service/website-banner.service';
import { Buffer } from 'buffer';
import { ImageCropperDialogComponent } from 'src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';

import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeComponent,
  OwlDateTimeFormats,
} from 'ng-pick-datetime';
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
    private service: WebsiteBannerService,
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
    linkedwith: new FormControl(),
    userads: new FormControl(),
    users: new FormControl(),
    enterurl: new FormControl(),
    assetTypeId: new FormControl(),
    assetSubtypeId: new FormControl(),
    assetSubSubTypeId: new FormControl(),
  };

  editDataView: any;
  lat: any;
  long: any;
  img = [];
  listAsset: any;
  listSubAsset: any;
  listSubSubAsset: any;
  currencySymbol: any;
  listGroup = [];
  facebookImagesUrl: any;
  facebookIsLoading = false;
  linkurl = false;
  usersActiveAds = false;
  usersName = false;
  assetTypeUi = false;
  assetSubTypeUi = false;
  assetSubSubTypeUi = false;
  statusType: any;
  verifiedTextMessage: any;
  limit = 10;
  paginationIndex = 0;
  editSubSubId: any;
  editSubId: any;
  userId: any;
  profilePicIcon: any;
  sellerDynamicData = [];
  listPlanType = [];
  listPlanCoverage = [];
  validityHoursList = [];
  langSelectors = [];
  listLang: any;
  docValue = [];
  imagesUrl: any;
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
  listUsersAds: any;
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
    this.route.params.subscribe(params => {
      console.log('banner edit view -----', params);
      // this.statusCode = params.sCode;
      this.assetId = params.id;
      // this.statusType = params.statusType;
    });
    // breadcrumb update
    if (this.assetId !== 1) {
      this.getEditBanner(this.assetId);
    } else {
      const breadcrumb = { AddtagT: 'Add' };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    }
    this.reasonaddForm();

    this.languageActive();
    this.listPlanType = [
      { id: 1, name: 'User Ad' },
      { id: 5, name: 'Link' },
      { id: 2, name: 'Asset Type' },
      { id: 3, name: 'Asset Sub Type' },
      { id: 4, name: 'Asset Sub Sub Type' },
    ];
    this.listPlanCoverage = [
      { name: 'city wide' },
      { name: 'country wide' },
      { name: ' state wide' },
    ];
    for (let i = 0; i < 25; i++) {
      this.validityHoursList.push({ name: i });
    }
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

  getSubAsset(e, data?) {
    if (e.hasSubType || data.assetsubtype) {
      const list = {
        assetSubSubtype: e._id || data.assetsubtype,
      };
      this.service.assetSubSubList(list).subscribe(
        (res: any) => {
          console.log('asset  SubSub   type', res);
          this.listSubSubAsset = res.data;
          const indx = this.listSubSubAsset.findIndex(
            val => val._id === data.name.id
          );
          console.log('getAsset indx ', indx);
          this.addForm.controls.assetSubSubTypeId.setValue(
            this.listSubSubAsset[indx]
          );
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
    // this.groupsList(data)
  }

  getAsset(e, data?, vals?) {
    if (e.hasSubType || data.assettype) {
      const list = {
        assetSubtype: e._id || data.assettype,
      };
      this.service.assetSubList(list).subscribe(
        (res: any) => {
          console.log('assetSubtype-++++++++++>>>>>>', res);
          this.listSubAsset = res.data;
          if (vals === 3) {
            const indx = this.listSubAsset.findIndex(
              val => val._id === data.name.id
            );
            console.log('getAsset val 3 indx ', indx);
            this.addForm.controls.assetSubtypeId.setValue(
              this.listSubAsset[indx]
            );
          } else if (vals === 4) {
            const indx = this.listSubAsset.findIndex(
              val => val._id === data.assetsubtype
            );
            console.log('getAsset indx ', indx);
            this.addForm.controls.assetSubtypeId.setValue(
              this.listSubAsset[indx]
            );
            this.getSubAsset(e, data);
          }

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

  reOrderGroup(data) {
    data.sort((a, b) => a.seqId - b.seqId);
    data.map(x => {
      x.attributes.map(att => {
        att.colorCode = 0;
      });
      x.attributes.sort((a, b) => a.seqId - b.seqId);
    });
    this.listGroup = data;
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
        this.reOrderGroup(getAsset.details);
        console.log('getAsset', getAsset);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllAsset(data?, vals?) {
    this.service.assetList().subscribe(
      (res: any) => {
        this.listAsset = res.data;
        console.log(' ****data**** ', data);

        if (vals === 2) {
          const indx = this.listAsset.findIndex(
            val => val._id === data.name.id
          );
          console.log('indx', indx);
          this.addForm.controls.assetTypeId.setValue(this.listAsset[indx]);
        } else if (vals === 3) {
          const indx = this.listAsset.findIndex(
            val => val._id === data.assettype
          );
          console.log('indx in sub type', indx);
          this.addForm.controls.assetTypeId.setValue(this.listAsset[indx]);
          this.getAsset('', data, vals);
        } else if (vals === 4) {
          const indx = this.listAsset.findIndex(
            val => val._id === data.assettype
          );
          this.addForm.controls.assetTypeId.setValue(this.listAsset[indx]);
          this.getAsset('', data, vals);
        }
        this.addForm.controls.assetTypeId.setValidators(Validators.required);
        this.addForm.controls.assetTypeId.updateValueAndValidity();
        if (this.assetId !== 1) {
          this.getAssetList();
        } else {
          const breadcrumbs = { AddtagT: 'Add' };
          this.breadCrumb.updateBreadcrumbLabels(breadcrumbs);
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

  getUsersAds(e, data?) {
    let list;
    if (e.value) {
      // this is for changing edit data
      list = {
        status: 1,
        userId: e.value._id,
      };
      this.service.tagsList(list).subscribe(
        (res: any) => {
          res.result.map(x => {
            x.contentTitle = x.assetTitle;
          });
          this.listUsersAds = res.result;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      // this is for setting edit data
      list = {
        status: 1,
        userId: e,
      };
      this.service.tagsList(list).subscribe(
        (res: any) => {
          res.result.map(x => {
            x.contentTitle = x.assetTitle;
          });
          this.listUsersAds = res.result;
          const indx = this.listUsersAds.findIndex(
            val => val._id === data.assetId
          );
          this.addForm.controls.userads.setValue(this.listUsersAds[indx]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  selectionChanged(e, data?) {
    switch (e.value.id) {
      case 1:
        // User Ad
        this.usersActiveAds = false;
        this.usersName = false;
        this.linkurl = true;
        this.assetTypeUi = true;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;
        console.log('data -User Ad--->', data);
        const list = {
          trigger: 3,
        };
        this.service.getusers(list).subscribe(
          (res: any) => {
            res.data.map(x => {
              x.contentTitle = x.firstName + ' ' + x.lastName;
            });
            this.listUsers = res.data;
            const indx = this.listUsers.findIndex(
              val => val._id === data.name.id
            );
            this.addForm.controls.users.setValue(this.listUsers[indx]);
            this.getUsersAds(data.name.id, data);
          },
          error => {
            console.log(error);
          }
        );
        break;
      case 2:
        // Asset Type
        this.getAllAsset(data, 2);
        this.linkurl = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
      case 3:
        // Asset Sub Type
        this.getAllAsset(data, 3);
        this.linkurl = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = false;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
      case 4:
        // Asset Sub Sub Type
        this.getAllAsset(data, 4);
        this.linkurl = true;
        this.usersActiveAds = true;
        this.usersName = true;
        this.assetTypeUi = false;
        this.assetSubTypeUi = false;
        this.assetSubSubTypeUi = false;
        break;
      case 5:
        // Link
        this.addForm.controls.enterurl.setValue(data.url);
        this.linkurl = false;
        this.assetTypeUi = true;
        this.assetSubTypeUi = true;
        this.assetSubSubTypeUi = true;
        this.usersActiveAds = true;
        this.usersName = true;
        break;
    }
  }

  getEditBanner(id, event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      bannerid: id,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.getEditBanner(list, event).subscribe(
      (res: any) => {
        console.log('getEditBanner----single------>', res.data[0]);

        this.imagesUrl = {
          imageLink: res.data[0].imageWeb,
        };
        this.facebookImagesUrl = {
          imageLink: res.data[0].imageMobile,
        };
        const indx = this.listPlanType.findIndex(
          val => val.id === res.data[0].type
        );
        this.addForm.controls.linkedwith.setValue(this.listPlanType[indx]);
        const idss = {
          id: res.data[0].type,
        };
        const e = {
          value: idss,
        };
        this.selectionChanged(e, res.data[0]);
        // this.addForm.controls.currencyplan.setValue(res.data[0].name);
        // this.addForm.controls.priceplan.setValue(res.data[0].price.USD);
        // this.addForm.controls.validitydays.setValue(res.data[0].validity);
        // this.addForm.controls.validityhours.setValue(res.data[0].validity);
        // this.addForm.controls.plancoverage.setValue(res.data[0].coverage.name);
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialogs(data, val) {
    this.imgErrMsg = false;
    if (data.target.value) {
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
            switch (val) {
              case 0:
                this.isLoading = true;
                break;
              case 1:
                this.facebookIsLoading = true;
                break;
            }
            this.uploadFiless(res, val);
          }
        });
    }
  }

  removeImgs(k, val) {
    switch (val) {
      case 0:
        // this.imagesUrl.splice(k, 1);
        (document.getElementById('imageUpload') as HTMLInputElement).value = '';
        break;
      case 1:
        // this.facebookImagesUrl.splice(k, 1);
        (document.getElementById(
          'facebookImageUpload'
        ) as HTMLInputElement).value = '';
        break;
    }
  }

  uploadFiless(image, val) {
    switch (val) {
      case 0:
        this.isLoading = true;
        // this.imagesUrl.push({
        //   imageLink: image,
        // });
        this.imagesUrl = {
          imageLink: image,
        };
        // this.facebookImagesUrl = image;
        this.isLoading = false;
        break;
      case 1:
        this.facebookIsLoading = true;
        // this.facebookImagesUrl.push({
        //   imageLink: image,
        // });
        this.facebookImagesUrl = {
          imageLink: image,
        };
        this.facebookIsLoading = false;
        break;
    }
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

  reasonaddForm() {
    this.formObj.linkedwith = new FormControl('', [Validators.required]);
    this.formObj.userads = new FormControl('', [Validators.required]);
    this.formObj.users = new FormControl('', [Validators.required]);
    this.formObj.enterurl = new FormControl('', [Validators.required]);
    this.formObj.assetTypeId = new FormControl('', [Validators.required]);
    this.formObj.assetSubtypeId = new FormControl('', [Validators.required]);
    this.formObj.assetSubSubTypeId = new FormControl('', [Validators.required]);
    this.addForm = this.formBuilder.group(this.formObj);
  }

  bannerPatchEditSubmit(data: any) {
    console.log('bannerPatchEditSubmit:++++++++++ ', data);
    this.submitted = true;
    let datalist;
    switch (data.linkedwith.id) {
      case 1:
        // User Ad
        datalist = {
          id: this.assetId,
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 1,
          data: {
            name: data.userads.assetTitle,
            id: data.userads.userId,
          },
          assetId: data.userads._id,
        };
        break;
      case 2:
        // Asset Type
        datalist = {
          id: this.assetId,
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 2,
          data: {
            name: data.assetTypeId.title,
            id: data.assetTypeId._id,
          },
        };
        break;
      case 3:
        // Asset Sub Type
        datalist = {
          id: this.assetId,
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 3,
          data: {
            name: data.assetSubtypeId.title,
            id: data.assetSubtypeId._id,
          },
          assettype: data.assetTypeId._id,
        };
        break;
      case 4:
        // Asset Sub Sub Type
        datalist = {
          id: this.assetId,
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 4,
          data: {
            name: data.assetSubSubTypeId.title,
            id: data.assetSubSubTypeId._id,
          },
          assettype: data.assetTypeId._id,
          assetsubtype: data.assetSubtypeId._id,
        };

        break;
      case 5:
        // Link
        datalist = {
          id: this.assetId,
          image_web: this.imagesUrl.imageLink,
          image_mobile: this.facebookImagesUrl.imageLink,
          type: 5,
          data: {},
          url: data.enterurl,
        };

        break;
    }

    this.service.patchBanner(datalist).subscribe(
      (res: any) => {
        console.log('postBanner---->', res);
        this.location.back();
        this.showToast('top-right', 'Banner Edited successfully!', 'success');
      },
      error => {
        this.showToast('top-right', error.error.message, 'danger');
        console.log(error);
      }
    );
  }
}
