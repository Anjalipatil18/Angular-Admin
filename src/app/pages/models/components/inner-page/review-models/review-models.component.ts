import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../service/models.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-models',
  templateUrl: './review-models.component.html',
  styleUrls: ['./review-models.component.scss'],
})
export class ReviewModelsComponent implements OnInit {
  constructor(
    private service: ModelsService,
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
      this.getAllModels();
      const breadcrumb = { AddtagT: params.name };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
  }

  getAllModels() {
    const list = {
      type: 'asset',
      id: this.likeId,
    };
    this.service.modelsLikesList(list).subscribe(
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
