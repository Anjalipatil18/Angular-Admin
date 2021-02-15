import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotorsService } from '../../service/promotors.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Ng7DynamicBreadcrumbService } from '../../../../../../../node_modules/ng7-dynamic-breadcrumb';
@Component({
  selector: 'app-promotors-guestclicks',
  templateUrl: './promotors-guestClicks.component.html',
  styleUrls: ['./promotors-guestClicks.component.scss'],
})
export class PromotorsGuestClicksComponent implements OnInit {
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  userId: any;
  statusCode: any;
  name: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: PromotorsService,
    private breadCrumb: Ng7DynamicBreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('*********params inner users pages***********', params);
      this.statusCode = params.sCode;
      this.userId = params.id;
      this.name = params.name;
      this.showSharedDataUsers(params.id);
    });
    const breadcrumb = { AddtagT: this.name };
    this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
  }

  // tabList:any;
  // selectTab(event){
  //  this.tabList = event.tabTitle;
  // }

  back() {
    this.location.back();
  }

  showSharedDataUsers(id) {
    console.log('-----id---inner pages---', id);
    this.service.sharedProductLogs(id).subscribe(
      (res: any) => {
        console.log('users inner data', res);
        this.userActive = res.data;
        console.log('users inner data //////', this.userActive);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.firstName &&
          data.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
  }
}
