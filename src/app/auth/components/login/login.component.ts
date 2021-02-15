import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NbToastrService } from '@nebular/theme';
import { Configuration } from 'src/app/global/global-config';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
const request = new XMLHttpRequest();
declare var google: any; // call google api
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private toastrService: NbToastrService,
    private route: Router,
    private conf: Configuration,
    private deviceService: DeviceDetectorService
  ) {
    this.conf.clear();
  }

  isLoading = false;
  ipAddress: any;
  latitude: any;
  longitude: any;
  city: any;
  country: any;
  private index = 0;

  ngOnInit() {
    this.getIpAddress();
    this.getLocation();
  }

  showToast(position, msg, status) {
    console.log('show toast', position, msg, status);
    this.index += 1;
    this.toastrService.show(
      msg || 'failed to login!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
  }

  onSubmit() {
    this.isLoading = true;
    // console.log(this.loginForm.value);
    const data = {
      data: [
        {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        },
      ],
    };
    this.subscription = this.loginService.login(data).subscribe(
      (res: any) => {
        // this.showToast('top-right', 'Logged in successfully', 'success');
        // this.toastrService.success('Login Successful');
        this.conf.setItem('token', res.result['0'].token);
        this.conf.setItem('refreshToken', res.result['0'].refreshToken);
        this.conf.setItem('username', res.result['0'].username);
        this.conf.setItem('userId', res.result['0'].userId);
        this.conf.setItem('lan', 'en');
        this.route.navigate(['/pages']);
        this.isLoading = false;
        this.UserAddSessionData();
      },
      error => {
        this.isLoading = false;
        console.log(error.error.message);
        this.showToast('top-right', error.error.message, 'danger');
        // this.toastrService.danger(error.error.message, error.statusText);
      }
    );
  }

  getIpAddress() {
    this.loginService.getIpAddress().subscribe(
      (res: any) => {
        console.log('ip', res);
        this.ipAddress = res.ip;
      },
      error => {}
    );
    // request.open('GET', 'https://ipapi.co/json', true)
    // request.onload = function() {
    //     // Begin accessing JSON data here
    //     var data = JSON.parse(this.response)

    //     console.log('data',request);
    //   }
    // let loadPosts = function () {
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //   if (this.readyState === 4 && this.status === 200) {
    //     let response = JSON.parse(this.responseText);
    //     // renderPosts(response);
    //    }
    // }
    // xhr.open("GET", "https://ipapi.co/json/");
    // xhr.setRequestHeader("Accept", 'application/json');
    // xhr.send();
    // }
  }

  UserAddSessionData() {
    const platformId = 'platformId';
    const browser = 'browser';
    const osversion = 'os_version';
    const browserversion = 'browser_version';
    const list = {
      emailId: this.loginForm.value.email,
      sessionStart: moment().valueOf(),
      // ipAddress: this.ipAddress || '106.51.66.44',
      action: 'login',
      usertype: 'admin',
      device: 'browser',
      deviceId: 'web_app_id',
      latitude: this.latitude,
      longitude: this.longitude,
      make: this.deviceService[browser],
      OSVersion: this.deviceService[osversion],
      appVersion: this.deviceService[browserversion],
      deviceModel:
        this.deviceService[browser] + ' ' + this.deviceService[browserversion],
    };
    this.loginService.UserAddSession(list).subscribe(
      (res: any) => {
        console.log('UserAddSessionData', res);
        this.conf.setItem('sessionLogId', res.result.sessionLogId);
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * @author bhavesh jain
   * @description get current position
   * @returns 13.023807099999999,77.5963159
   */
  getLocation() {
    // if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(this.showPosition);
    // } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
    // }
  }

  /**
   * @author bhavesh jain
   * @description get data using let long
   * @param * position setting the postion to Properties
   * @returns Bengaluru, India
   */
  showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude),
    };
    geocoder.geocode({ location: latlng }, function(results, status) {
      const addressComponents = 'address_components';
      const country = 'country';
      const locality = 'locality';
      // for (let i = 0; i < results.length; i++) {
      for (const i of results) {
        if (results[i].types[0] === country) {
          this.country = results[i][addressComponents][0].long_name;
        }
        if (results[i].types[0] === locality) {
          this.city = results[i][addressComponents][0].long_name;
        }
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Un Subscription Success');
  }
}
