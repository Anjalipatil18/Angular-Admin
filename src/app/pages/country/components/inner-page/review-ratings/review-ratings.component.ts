import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../service/rating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-ratings',
  templateUrl: './review-ratings.component.html',
  styleUrls: ['./review-ratings.component.scss'],
})
export class ReviewRatingsComponent implements OnInit {
  constructor(
    private service: RatingService,
    private route: ActivatedRoute,
    private breadCrumb: Ng7DynamicBreadcrumbService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.likeId = params.id;
      this.getAllRating();
      const breadcrumb = { AddtagT: params.name };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
  }

  getAllRating() {
    const list = {
      type: 'asset',
      id: this.likeId,
    };
    this.service.ratingLikesList(list).subscribe(
      (res: any) => {
        console.log('like/type/id', res.data[0]);
        if (res.data[0]) {
          this.userActive = res.data[0].likedUsers;
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
