import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AttributeGroupService } from '../service/attribute-group.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Component({
  selector: 'app-update-attribute-group',
  templateUrl: './update-attribute-group.component.html',
  styleUrls: ['./update-attribute-group.component.scss'],
})
export class UpdateAttributeGroupComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  reasonId: any;
  resEdit: any;
  attributeList: any;
  listLang: any;
  langSelectors = [];
  formObj = {
    icon: new FormControl(),
    titleTag: new FormControl(),
    attributesIds: new FormControl(),
  };
  dataList: any;
  profilePicIcon: any;
  isLoadingIcon = false;

  config = {
    displayKey: 'contentTitle', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
  };

  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: AttributeGroupService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private cloudinary: Cloudinary
  ) {}

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
      const title = this.reasonId === '1' ? 'Add' : 'Edit';
      const breadcrumb = { attrGroupTitle: title };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });

    this.languageActive();
    this.getAllUsers();

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

  getAllUsers() {
    const list = {
      set: 0,
      limit: 100,
      status: 1,
    };
    this.service.attributesList(list).subscribe(
      (res: any) => {
        console.log('attributes/1', res);
        res.result.map(x => {
          x.contentTitle = x.title.en + ' (' + x.titleTag + ')';
        });
        this.attributeList = res.result;
        this.dataList = res.result;
      },
      error => {
        console.log(error);
      }
    );
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
          this.formObj[x.languageCode] = new FormControl('');
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addUserForm.controls[
            this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addUserForm.controls[
            this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }

        if (this.reasonId !== '1') {
          this.getEditattribute();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  reasonaddForm() {
    // console.log(this.formObj);
    this.formObj.icon = new FormControl('');
    this.formObj.titleTag = new FormControl('', [Validators.required]);
    this.formObj.attributesIds = new FormControl('', [Validators.required]);
    this.addUserForm = this.formBuilder.group(this.formObj);
  }

  reportCheckbox(event, i, lang) {
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addUserForm.controls[lang].setValidators(Validators.required);
      this.addUserForm.controls[lang].updateValueAndValidity();
    } else {
      this.addUserForm.controls[lang].setValidators(null);
      this.addUserForm.controls[lang].updateValueAndValidity();
      this.addUserForm.controls[lang].setValue('');
    }
    // console.log('thisadduserform', this.addUserForm);
  }

  getEditattribute() {
    this.service.attributesListEdit(this.reasonId).subscribe(
      (res: any) => {
        console.log('attributes/id', res);
        this.resEdit = res.result[0].title;
        for (const prop in this.resEdit) {
          if (this.resEdit[prop]) {
            this.addUserForm.get(prop).setValue(this.resEdit[prop]);
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
          }
        }

        let id = [];
        res.result[0].attributes.map(y => {
          const index = this.attributeList.findIndex(m => m.id === y.attrId);
          // console.log(index)
          if (index > -1) {
            // console.log(this.attributeList[index]);
            id = [...id, this.attributeList[index]];
          }
        });
        //  res.result[0].attributes.map(x => {
        //     id.push(x.attrId)
        // });
        this.addUserForm.get('titleTag').setValue(res.result[0].titleTag);
        this.addUserForm.get('attributesIds').setValue(id);
        this.addUserForm.get('icon').setValue(res.result[0].icon);
        this.profilePicIcon = res.result[0].icon;
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
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    const list = {
      icon: '',
      titleTag: '',
      attributesIds: '',
    };
    for (const prop in data) {
      if (data[prop]) {
        list[prop] = data[prop];
      }
    }
    delete list.icon;
    delete list.titleTag;
    delete list.attributesIds;
    let ids = [];
    data.attributesIds.map(x => {
      ids = [...ids, x.id];
    });
    const datas = {
      title: list,
      titleTag: data.titleTag,
      icon: data.icon,
      attributesIds: ids,
    };

    console.log(datas);
    this.service.addAtrribute(datas, this.reasonId).subscribe(
      (res: any) => {
        this.location.back();
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  filterSearch(val) {
    const attributeList = this.dataList.filter(x => {
      if (val.length > 0) {
        console.log(val.toString().toLowerCase());
        return (
          x.title.en
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) === 0
        );
      } else {
        return this.attributeList;
      }
    });
    // console.log(city)
    this.attributeList = attributeList;
  }

  back() {
    this.location.back();
  }

  uploadIconFile(e) {
    this.uploader.uploadAll();
    // this.isLoadingIcon = true;
    // var bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    // const dt = moment().valueOf();
    // if (file) {
    //   var params = { Key: "profile_" + this.reasonId+dt+'.jpg', ContentType: file.type, Body: file };
    //   bucket.upload(params, (err, data) => {
    //     // console.log(data);
    //     this.profilePicIcon = data.Location;
    //     this.addUserForm.get('icon').setValue(data.Location);
    //     this.isLoadingIcon = false;
    //   });
    // }
    // return false;
  }
}
