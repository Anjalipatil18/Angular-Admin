import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/global/global-config';
import { AssetTypeService } from '../../service/asset-type.service';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';
import { ImageCropperDialogComponent } from 'src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Buffer } from 'buffer';

import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';

declare var AWS: any;

@Component({
  selector: 'app-update-sub-type',
  templateUrl: './update-sub-type.component.html',
  styleUrls: ['./update-sub-type.component.scss'],
})
export class UpdateSubTypeComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: AssetTypeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogService: NbDialogService,
    private cloudinary: Cloudinary
  ) {}

  addUserForm: FormGroup;
  submitted = false;
  reasonId: any;
  resEdit: any;
  listLang: any;
  triggerId: any;
  subId: any;
  isLoading = false;
  profilePic: string;
  profilePicIcon: any;
  isLoadingIcon = false;
  hasScat = false;
  langSelectors = [];
  formObj = {};

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
    this.addUserForm.get('icon').setValue(cloudinaryImage.secure_url);
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
      this.reasonId = params.id;
      this.subId = params.sId;
      this.triggerId = params.tId;
    });
    this.languageActive();

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
          console.log(x);
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });
          console.log(x.languageCode);
          this.formObj['title_' + x.languageCode] = new FormControl('');
        });
        this.addForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        console.log('index ', index);
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addUserForm.controls[
            'title_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addUserForm.controls[
            'title_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }
        console.log(
          'aaaaaaaaaaaaaaaaaaaaaaaaa',
          this.langSelectors,
          this.subId,
          typeof this.subId
        );

        if (this.subId !== '1') {
          this.getEditSupportText();
        } else {
          const titleST =
            this.triggerId === '1'
              ? 'Types'
              : this.triggerId === '2'
              ? 'Sub Type'
              : 'Sub Sub Type';
          const title = 'Add';
          const breadcrumb = { subTypeT: titleST, subTypeE: title };
          this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addForm() {
    // console.log(this.formObj);
    // this.formObj['profilePic'] = new FormControl('')
    // this.formObj['icon'] = new FormControl('')
    // this.listLang.map(x => {
    //   console.log(x)
    //   this.formObj['title_' + x.languageCode] = new FormControl('');
    // });

    this.addUserForm = this.formBuilder.group(this.formObj);
  }

  reportCheckbox(event, i, lang) {
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addUserForm.controls['title_' + lang].setValidators(
        Validators.required
      );
      this.addUserForm.controls['title_' + lang].updateValueAndValidity();
    } else {
      this.addUserForm.controls['title_' + lang].setValidators(null);
      this.addUserForm.controls['title_' + lang].updateValueAndValidity();
      this.addUserForm.controls['title_' + lang].setValue('');
    }
    // console.log('thisadduserform', this.addUserForm);
  }

  hasSubCat(event) {
    this.hasScat = event.target.checked;
  }

  getEditSupportText() {
    this.service.editAssetTypeList(this.triggerId, this.subId).subscribe(
      (res: any) => {
        console.log('assetTypesInfo/triggerId/id', res);
        this.resEdit = res.result[0];
        const title = 'Edit';
        const titleST =
          this.triggerId === '2'
            ? 'Sub Type'
            : this.triggerId === '3'
            ? 'Sub Sub Type'
            : '';
        const breadcrumb = {
          subTypeT: titleST + '(' + this.resEdit.title_en + ')',
          subTypeE: title,
        };
        this.breadCrumb.updateBreadcrumbLabels(breadcrumb);

        const lang = res.result[0].titleLang;
        console.log('res.result[0]', res.result[0]);
        this.hasScat = this.resEdit.hasSubType;
        // this.addUserForm.get('profilePic').setValue(this.resEdit.images.website)
        this.profilePic = this.resEdit.images.website;
        // this.addUserForm.get('icon').setValue(this.resEdit.icon)
        this.profilePicIcon = this.resEdit.icon;

        for (const prop in lang) {
          if (lang[prop]) {
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
          }
        }
        this.langSelectors.map(x => {
          if (x.active) {
            this.addUserForm.controls['title_' + [x.languageCode]].setValue(
              this.resEdit['title_' + [x.languageCode]]
            );
            this.addUserForm.controls[
              'title_' + [x.languageCode]
            ].setValidators(Validators.required);
            this.addUserForm.controls[
              'title_' + [x.languageCode]
            ].updateValueAndValidity();
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.addUserForm.controls;
  }

  getUsers(data: any) {
    console.log('data data', data);
    this.submitted = true;
    console.log(this.addUserForm.invalid);
    if (this.addUserForm.invalid) {
      return;
    }

    const type = {
      hasSubType: this.hasScat,
      trigger: Number(this.triggerId),
      icon: this.profilePicIcon || '',
      images: {
        website: this.profilePic || '',
        app: this.profilePic || '',
      },
    };
    for (const prop in data) {
      if (data[prop]) {
        type[prop] = data[prop];
      }
    }

    delete this.profilePic;

    console.log(type);
    this.service.updateAssetType(type, this.subId, this.reasonId).subscribe(
      (res: any) => {
        console.log(res);
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(data) {
    console.log('upload', data.target.value.split('/'));
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
          console.log('open image', res);
          // this.isLoading = true;
          if (res) {
            this.uploadFile(res);
          } else {
            (document.getElementById('profileImg') as HTMLInputElement).value =
              '';
          }
        });
    }
  }

  uploadFile(res) {
    this.profilePic = res;

    //  this.addUserForm.get('profilePic').setValue(res);
    //  alert('aa');
    this.isLoading = false;
  }

  uploadIconFile(image) {
    // this.uploader.uploadAll();
    // var bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    // const dt = moment().valueOf();
    // if (file) {
    //   var params = { Key: "profile_" + this.reasonId+dt+'.jpg', ContentType: file.type, Body: file };
    //   bucket.upload(params, (err, data) => {
    //     console.log(data);
    this.profilePicIcon = image;
    //     this.addUserForm.get('icon').setValue(data.Location);
    this.isLoadingIcon = false;
    //   });
    // }
    // return false;
  }
}
