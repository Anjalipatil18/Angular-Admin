import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../service/seller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-seller-likes',
  templateUrl: './seller-likes.component.html',
  styleUrls: ['./seller-likes.component.scss'],
})
export class SellerLikesComponent implements OnInit {
  constructor(
    private service: SellerService,
    private route: ActivatedRoute,
    private breadCrumb: Ng7DynamicBreadcrumbService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;
  likeName: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('asdfghjkl', params);
      this.likeId = params.id;
      this.likeName = params.name;
      this.getAllSeller();

      const breadcrumb = { AddtagT: params.name };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);

      // const breadcrumb =  {rTitle: params['name']};
      // this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
  }

  getAllSeller() {
    console.log('this.likeId', this.likeId);
    const list = {
      userIds: [this.likeId],
    };
    this.service.sellerLikesList(list).subscribe(
      (res: any) => {
        console.log('like/type/id', res.data);
        if (res.data) {
          this.userActive = res.data;
        }
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
          data.refferals.firstName &&
          data.refferals.firstName.toLowerCase().includes(value.toLowerCase())
        ) {
          this.userActiveSearch.push(data);
        } else if (
          data.refferals.email &&
          data.refferals.email.toLowerCase().includes(value.toLowerCase())
        ) {
          this.userActiveSearch.push(data);
        } else if (
          data.refferals.phoneNumber &&
          data.refferals.phoneNumber
            .toUpperCase()
            .indexOf(value.toUpperCase()) > -1
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
