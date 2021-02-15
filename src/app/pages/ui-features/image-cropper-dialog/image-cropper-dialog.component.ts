import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
})
export class ImageCropperDialogComponent implements OnInit {
  croppedImage: any = '';

  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;
  @Input() type: string;

  constructor(
    protected ref: NbDialogRef<ImageCropperDialogComponent>,
    private cloudinary: Cloudinary,
    private service: UsersService
  ) {}
  profilePicIcon: any;
  isLoadingIcon = false;
  addUserForm: FormGroup;
  reason = '';
  width: any;
  height: any;

  imgTitle: any = '';
  imgAlt: any = '';
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
    // cloudinary
    // this.uploader = new FileUploader(this.uploaderOptions);
    // this.uploaders = new FileUploader(this.uploaderOptions);
    // this.uploader.onBeforeUploadItem = (fileItem: any): any => {
    //   console.log("fileItem ", fileItem)
    //   fileItem.withCredentials = false;
    //   fileItem.secure = true;
    // }
    // this.uploader.onAfterAddingFile = (fileItem:any) => {
    //   fileItem.withCredentials = false;
    //   fileItem.upload_preset = this.Cloudinary.config().upload_preset;
    // };
    // this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
    //   form.append('upload_preset', this.Cloudinary.config().upload_preset);
    // };
    // this.uploader.onSuccessItem  = this.imageUploader;
    // this.uploaders.onSuccessItem  = this.imageUploaders;
    // this.uploader.uploadAll();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.width = event.width;
    this.height = event.height;
    console.log(event, this.ref.componentRef.instance);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cancel() {
    this.ref.close();
  }

  crop() {
    this.ref.componentRef.instance.height = this.height;
    this.ref.componentRef.instance.width = this.width;
  }
  submit() {
    // console.log('this.uploader',this.Cloudinary.config().cloud_name, this.croppedImage);
    // let imageData = {
    // this.uploader.uploadAll();
    //   croppedImage: this.croppedImage,
    //   imageTitle: this.imgTitle,
    //   imageAlt: this.imgAlt
    // }
    // this.ref.close(imageData);

    // this.Cloudinary.uploader.upload(this.croppedImage, { crop: "fit",q_auto:"good",format:'jpg' },function(err,cloudinaryImage) {
    //   resultData = cloudinaryImage;
    //   cloudinaryImage ? console.log("resultData",cloudinaryImage):'';
    // });
    // cloudinary1.v2.uploader.upload(this.croppedImage, { crop: "fit",q_auto:"good",format:'jpg' },function(err,cloudinaryImage) {
    //   resultData = cloudinaryImage;
    //   cloudinaryImage ? console.log("resultData",cloudinaryImage):'';
    // });

    this.service
      .uploadImageToCloud(this.croppedImage, this.cloudinary.config())
      .subscribe(
        (res: any) => {
          this.ref.close(res.secure_url);
        },
        error => {
          console.log(error);
        }
      );
  }
}
