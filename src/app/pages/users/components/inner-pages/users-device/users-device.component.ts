import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../service/users.service';

@Component({
  selector: 'app-users-device',
  templateUrl: './users-device.component.html',
  styleUrls: ['./users-device.component.scss'],
})
export class UsersDeviceComponent implements OnInit {
  userDevice: any;
  userDeviceData: any = [];
  userDeviceSearch: any;
  columns: any;
  deviceId: any;

  constructor(
    private location: Location,
    private service: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deviceId = params.id;
      this.getAllDevice();
    });
  }

  back() {
    this.location.back();
  }

  getAllDevice() {
    const list = {
      set: 0,
      limit: 10,
      id: this.deviceId,
    };
    this.service.usersDevice(list).subscribe(
      (res: any) => {
        console.log('userDeviceLogs/id', res);
        this.userDevice = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    this.userDeviceSearch = [];
    this.userDeviceData = [];
    if (value && this.userDevice && this.userDevice.length > 0) {
      this.userDeviceData = this.userDevice;
      this.userDeviceData.map(data => {
        if (
          data.deviceTypeText &&
          data.deviceTypeText.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userDeviceSearch.push(data);
        }
      });
      this.userDeviceData = this.userDeviceSearch;
    } else {
      console.log('else');
    }
  }
}
