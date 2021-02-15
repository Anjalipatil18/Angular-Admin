import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from './../../service/users.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/global/global-config';
import { ImageCropperDialogComponent } from 'src/app/pages/ui-features/image-cropper-dialog/image-cropper-dialog.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { Buffer } from 'buffer';

declare var AWS: any;

@Component({
  selector: 'app-userdetails-update',
  templateUrl: './userdetails-update.component.html',
  styleUrls: ['./userdetails-update.component.scss'],
})
export class UserdetailsUpdateComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  reasonId: any;
  sId: any;
  profilePic: any;
  isLoading: any;

  constructor(
    private service: UsersService,
    private dialogService: NbDialogService,
    private conf: Configuration,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reasonId = params.id;
      this.sId = params.sId;
      if (this.reasonId !== 1) {
        this.getEditForm();
      }
    });
    this.usersAddForm();
  }

  getEditForm() {
    this.service.usersListEdit(this.reasonId).subscribe(
      (res: any) => {
        console.log('users/userId/1', res);
        const userData = res.result[0];
        this.addForm.get('firstName').setValue(userData.firstName);
        this.addForm.get('lastName').setValue(userData.lastName);
        this.addForm.get('email').setValue(userData.email);
        this.addForm.get('countryCode').setValue(userData.countryCode);
        this.addForm.get('phoneNumber').setValue(userData.phoneNumber);
        this.addForm.get('password').setValue(userData.password);
        this.addForm.get('profilePic').setValue(userData.profilePic);
        this.profilePic = userData.profilePic;
      },
      error => {
        console.log(error);
      }
    );
  }

  usersAddForm() {
    this.addForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      countryCode: new FormControl(''),
      profilePic: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  get f() {
    return this.addForm.controls;
  }

  getUsers(data: any) {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    console.log(data);
    this.service.usersListUpdate(data, this.reasonId).subscribe(
      (res: any) => {
        this.location.back();
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    this.location.back();
  }

  openDialog(data) {
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
        // console.log(res);
        if (res) {
          this.uploadFile(res);
        }
      });
  }

  uploadFile(e) {
    this.isLoading = true;
    const bucket = new AWS.S3({ params: { Bucket: 'lopongo' } });
    // var fileChooser = e.srcElement;
    // var file = fileChooser.files[0];
    const dt = moment().valueOf();
    const buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    if (buf) {
      const params = {
        Key: 'profile_' + this.reasonId + dt + '.jpg',
        ContentType: 'image/jpeg',
        Body: buf,
      };
      bucket.upload(params, (err, data) => {
        // console.log(data);
        this.profilePic = data.Location;
        this.addForm.get('profilePic').setValue(data.Location);
        this.isLoading = false;
      });
    }
    return false;
  }
}
