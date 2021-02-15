import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotionPlanService } from './../../service/promotion-plan.service';

@Component({
  selector: 'app-purchase-logs',
  templateUrl: './purchase-logs.component.html',
  styleUrls: ['./purchase-logs.component.scss'],
})
export class PurchaseLogsPlansComponent implements OnInit {
  constructor(
    private location: Location,
    private service: PromotionPlanService,
    private route: ActivatedRoute
  ) {}

  userDevice: any;
  userDeviceData: any = [];
  userDeviceSearch: any;
  columns: any;
  deviceId: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deviceId = params.id;
      this.getpurchaseLogs();
    });
  }

  back() {
    this.location.back();
  }

  getpurchaseLogs() {
    const list = {
      set: 0,
      limit: 10,
      id: this.deviceId,
    };
    this.service.getPurchaseLogs(list).subscribe(
      (res: any) => {
        console.log('userDeviceLogs/id=========', res.data);
        this.userDevice = res.data.promotionLogsData;
        this.userDevice.map(x => {
          x.purchaseDate = x.purchaseDate.split('T')[0];
        });
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
