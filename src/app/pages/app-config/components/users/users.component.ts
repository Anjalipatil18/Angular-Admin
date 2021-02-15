import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Configuration } from 'src/app/global/global-config';
import { Router } from '@angular/router';
import { AppConfigService } from './../service/app-config.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private service: AppConfigService,
    private toastrService: NbToastrService
  ) {}

  get f() {
    return this.configForm.controls;
  }

  configForm: FormGroup;
  action = true;
  submitted = false;

  reasons: any;
  reasonsSearch = [];
  reasonsData = [];
  columns: any;
  timeUnits = ['Hours', 'Mins', 'Days'];
  radiusUnits = ['Kilometer', 'Miles'];

  configData: any;

  private index = 0;

  expiryUnit: 'Mins';

  radiusUnit: 'km/miles';

  ngOnInit() {
    this.getConfig();
    this.usersAddForm();
  }
  getConfig() {
    this.service.getAppConfig().subscribe(
      (res: any) => {
        console.log('addAppConfig/', res.data);
        this.configData = res.data;
        this.configForm.controls.maxAttempOtp.setValue(
          this.configData.maxAttempOtp
        );
        this.configForm.controls.expireOtp.setValue(this.configData.expireOtp);
        this.configForm.controls.daysExpiry.setValue(
          this.configData.AdExpirationTime.days
        );
        this.configForm.controls.hoursExpiry.setValue(
          this.configData.AdExpirationTime.hours
        );
        this.configForm.controls.defaultRadius.setValue(
          this.configData.defaultListingFetchRadius.value
        );
        this.configForm.controls.radiusUnits.setValue(
          this.configData.defaultListingFetchRadius.unit
        );
        this.configForm.controls.maxAttempForget.setValue(
          this.configData.maxAttempForgotPassword
        );
        this.configForm.controls.privacyLink.setValue(
          this.configData.privacyLink
        );
        this.configForm.controls.termsLink.setValue(this.configData.termsLink);
      },
      error => {
        console.log(error);
      }
    );
  }
  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(
      msg || 'failed!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
  }
  usersAddForm() {
    this.configForm = new FormGroup({
      maxAttempOtp: new FormControl('', [Validators.required]),
      expireOtp: new FormControl('', [Validators.required]),
      daysExpiry: new FormControl('', [Validators.required]),
      hoursExpiry: new FormControl('', [Validators.required]),
      defaultRadius: new FormControl('', [Validators.required]),
      radiusUnits: new FormControl('', [Validators.required]),
      maxAttempForget: new FormControl('', [Validators.required]),
      privacyLink: new FormControl('', [
        Validators.required,
        Validators.pattern(
          'https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}'
        ),
      ]),
      termsLink: new FormControl('', [
        Validators.required,
        Validators.pattern(
          'https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}'
        ),
      ]),
    });
    this.configForm.controls.defaultRadius.setValue(this.radiusUnits[0]);
  }
  // select Add Expiration Time
  expiryTime(event) {
    console.log('ad expiry time---->', event);
    // this.expiryUnit = event;
    this.configForm.controls.timeUnits.setValue(event);
    console.log('config form controls', this.configForm);
  }
  // select default fetch radius
  defaultRadius(event) {
    console.log('ad expiry time---->', event);
    // this.radiusUnit = event;
    // this.configForm.controls['defaultRadius'].setValue(event);
  }
  getUsers(data: any) {
    const adExpirationTimes = {
      days: data.daysExpiry,
      hours: data.hoursExpiry,
    };
    const defaultListingFetchRadiuss = {
      value: data.defaultRadius,
      unit: data.radiusUnits,
    };
    const list = {
      maxAttempOtp: data.maxAttempOtp,
      expireOtp: data.expireOtp,
      AdExpirationTime: adExpirationTimes,
      defaultListingFetchRadius: defaultListingFetchRadiuss,
      maxAttempForgotPassword: data.maxAttempForget,
      privacyLink: data.privacyLink,
      termsLink: data.termsLink,
    };
    this.submitted = true;
    if (this.configForm.invalid) {
      this.showToast('top-right', 'Mandatory fields are missing!', 'danger');
      return;
    } else {
      this.showToast('top-right', 'Changes updated successfully', 'success');
    }
    // console.log('form submit function', this.submitted, this.configForm.invalid);

    console.log('expiry time data---->', data);
    this.service.getaddAppConfig(list).subscribe(
      (res: any) => {
        console.log('addAppConfig/', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  onKey(event) {
    console.log(event);
    const tarea = event.target.value;
    if (
      tarea.indexOf('http://www') === 0 ||
      tarea.indexOf('https://www') === 0
    ) {
      console.log('aa');
    } else {
      return false;
    }
  }
}
