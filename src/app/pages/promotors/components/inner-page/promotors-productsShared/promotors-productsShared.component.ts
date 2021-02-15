import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotorsService } from '../../service/promotors.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ProductSharedClickLogsDialogComponent } from '../productsharedclicklogs-dialog/productsharedclicklogs-dialog.component';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';
@Component({
  selector: 'app-promotors-productsshared',
  templateUrl: './promotors-productsShared.component.html',
  styleUrls: ['./promotors-productsShared.component.scss'],
})
export class PromotorsProductsSharedComponent implements OnInit {
  // userActiveData:any = [];
  // userActiveSearch:any;
  // userActive:any;
  // columns:any;
  // userId:any;
  // statusCode:any;

  constructor() // private location:Location,
  // private route:ActivatedRoute,
  // private _service:UsersService
  {}

  tabList: any;

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   console.log("*********params inner users pages***********", params);
    //   this.statusCode = params['sCode'];
    //   this.userId = params['id'];
    //   this.showSharedDataUsers(params.id);
    // })
  }
  selectTab(event) {
    this.tabList = event.tabTitle;
  }

  // back(){
  //   this.location.back();
  // }

  // showSharedDataUsers(id){
  //   console.log("-----id---inner pages---", id);
  //   this._service.sharedProductLogs(id).subscribe(
  //     (res: any) => {
  //       console.log('users inner data', res);
  //       this.userActive = res.data;
  //       console.log('users inner data //////', this.userActive);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // searchVerifiedActive(value){
  //   this.userActiveSearch = [];
  //   this.userActiveData = [];
  //   if (value && this.userActive && this.userActive.length > 0) {
  //     this.userActiveData = this.userActive;
  //     this.userActiveData.map(data => {
  //       if (data.firstName &&
  //         data.firstName
  //           .toUpperCase()
  //           .indexOf(value.toUpperCase()) > -1
  //       ) {
  //         this.userActiveSearch.push(data);
  //       }
  //     });
  //     this.userActiveData = this.userActiveSearch;
  //   } else {
  //     console.log("else");
  //   }
  // }
}
