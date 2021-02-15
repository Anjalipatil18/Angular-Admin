import { Component, OnInit } from '@angular/core';
// import { Location } from "@angular/common";
// import { Router, ActivatedRoute } from '@angular/router';
// import { UsersService } from '../../service/users.service';
// import { NbToastrService, NbDialogService  } from '@nebular/theme';
@Component({
  selector: 'app-users-products-shared',
  templateUrl: './users-productsShared.component.html',
  styleUrls: ['./users-productsShared.component.scss'],
})
export class UsersProductsSharedComponent implements OnInit {
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
