import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { SellerService } from '../../service/seller.service';

import { NgSelectConfig } from '@ng-select/ng-select';
import * as moment from 'moment';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ImageCropperDialogComponent } from 'src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';
import { Buffer } from 'buffer';

declare var AWS: any;

@Component({
  selector: 'app-newuserseller-dialog',
  templateUrl: './newuserseller-dialog.component.html',
  styleUrls: ['./newuserseller-dialog.component.scss'],
})
export class NewUsersSellerDialogComponent implements OnInit {
  constructor(
    protected ref: NbDialogRef<NewUsersSellerDialogComponent>,
    private service: SellerService,
    private configSelect: NgSelectConfig,
    private dialogService: NbDialogService
  ) {
    this.configSelect.notFoundText = 'No currency found!';
  }

  get f() {
    return this.addForm.controls;
  }
  @Input() ok: string;
  @Input() cancelT: string;

  addForm: FormGroup;
  submitted = false;
  emailVaild: any;
  usernameVaild: any;

  countries: any = [];
  countryNames: any = [];

  maxDate = moment(new Date()).format('YYYY-MM-DD');
  // get all countries
  defaultCountryCode: any;
  defaultCountryName: any;
  validEmail = false;

  // profile image upload
  isLoading = false;
  imgErrMsg: any;
  seqIds = 1;
  imagesUrl: any;
  imageGet = false;
  ngOnInit() {
    this.usersAddForm();
    this.getCountries();
  }
  getCountries() {
    const list = {
      set: 0,
      limit: 0,
    };
    const plusAdd = '+';
    this.service.countryList(list).subscribe(
      (res: any) => {
        res.data.map((x, id) => {
          if (this.countries && this.countries.length > 0) {
            // id == 0 ? this.defaultCountryCode = `${plusAdd}${x.callingCodes[0]}` : '';
            // id == 0 ? this.defaultCountryName = `${x.name}` : '';

            const index = this.countries.findIndex(
              y => y.name === `${plusAdd}${x.callingCodes[0]}`
            );
            const val =
              index === -1
                ? this.countries.push({
                    name: `${plusAdd}${x.callingCodes[0]}`,
                    id,
                  })
                : '';

            const countryIndex = this.countryNames.findIndex(
              y => y.name === `${x.name}`
            );
            const vals =
              countryIndex === -1
                ? this.countryNames.push({ name: `${x.name}`, id })
                : '';
          } else {
            // id == 0 ? this.defaultCountryCode = `${plusAdd}${x.callingCodes[0]}` : '';
            // id == 0 ? this.defaultCountryName = `${x.name}` : '';

            this.countries.push({ name: `${plusAdd}${x.callingCodes[0]}`, id });
            this.countryNames.push({ name: `${x.name}`, id });
          }
        });
        this.defaultCountryCode = this.countries[0].name;
        this.defaultCountryName = this.countryNames[0].name;
      },
      error => {
        console.log(error);
      }
    );
  }
  // username validate
  validateUserName(event) {
    this.usernameVaild = false;
    if (event.target.value.length > 4) {
      this.service.postUserValidation(event.target.value).subscribe(
        (res: any) => {
          this.usernameVaild = false;
        },
        error => {
          this.usernameVaild = true;
          console.log(error);
        }
      );
    }
  }
  // email validate
  validateEmail(event) {
    console.log('email validate', event.target.value);
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(event.target.value) === true) {
      console.log('valid email', event.target.value);
      const data = {
        email: event.target.value,
      };
      this.service.getemailValidation(data).subscribe(
        (res: any) => {
          console.log('adminUserCheckEmail/', res);
          this.emailVaild = false;
          this.validEmail = false;
        },
        error => {
          this.validEmail = true;
          this.emailVaild = true;
          console.log('yes');
        }
      );
    } else {
      this.emailVaild = true;
      console.log('Invalid Email Address', event.target.value);
    }
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
          // console.log(res);
          if (res) {
            // this.uploadFiles(res, val);
            this.uploadFiless(res, 0, data);
          }
        });
    }
  }
  seqId() {
    return this.seqIds++;
  }
  uploadFiles(e, val) {
    switch (val) {
      case 0:
        this.isLoading = true;
        break;
    }
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    const dt = moment().valueOf();
    const buf = new Buffer(
      e.croppedImage.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    let fileName;
    if (
      this.addForm.controls.firstName &&
      this.addForm.controls.firstName.value !== ''
    ) {
      fileName = this.addForm.controls.firstName.value.split(' ').join('-');
    } else {
      fileName = 'promotor';
    }
    console.log('fileName', fileName);
    if (buf) {
      const params = {
        Key: fileName + '_' + dt + '_' + this.seqId() + '.jpg',
        ContentType: 'image/jpeg',
        Body: buf,
      };
      bucket.upload(params, (err, data) => {
        switch (val) {
          case 0:
            this.imagesUrl = {
              imageLink: data.Location,
              seqId: this.imagesUrl,
              title: e.imgTitle ? e.imgTitle : '',
              alt: e.imgAlt ? e.imgAlt : '',
            };
            this.isLoading = false;
            break;
        }
      });
    }
    return false;
  }

  uploadFiless(image, val, event?, i?) {
    switch (val) {
      case 0:
        this.imagesUrl = {
          imageLink: image,
          seqId: 1,
        };
        this.isLoading = false;
        this.imageGet = true;
        break;
    }
    console.log(this.imagesUrl);
  }

  removeImgs(k, val) {
    this.imagesUrl = '';
    this.imageGet = false;
    // switch(val) {
    //   case 0: this.imagesUrl.splice(k, 1);
    //     (<HTMLInputElement>document.getElementById('imageUpload')).value = '';
    //     break;
    // }
    // this.imagesUrl.splice(k, 1);
    // (<HTMLInputElement>document.getElementById('imageUpload')).value = '';
  }

  getUsers(data: any) {
    const list = {
      loginType: 1,
      username: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      countryCode: data.countryCode.name,
      phoneNumber: data.phone,
      dateOfBirth: data.dob,
      country: data.country.name,
      facebookId: '',
      googleId: '',
      password: data.password,
      profilePic: this.imagesUrl.imageLink,
      deviceId: 'admin',
      deviceMake: 'admin',
      deviceModel: 'admin',
      deviceTypeCode: 3,
      deviceOs: 'admin',
      appVersion: 'admin',
      isAdmin: 1,
    };
    console.log('==list data===>>>', list);
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log('invalid form');
      return;
    } else {
      console.log('new user create result', list);
      this.service.sellerSignup(list).subscribe(
        (res: any) => {
          console.log('addAdminUsers/', res);
          this.ref.close(1);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cancel() {
    this.ref.close();
  }

  usersAddForm() {
    this.addForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      // profile: new FormControl("", [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
    });
  }
}
