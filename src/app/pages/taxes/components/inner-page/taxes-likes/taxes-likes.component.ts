import { Component, OnInit } from '@angular/core';
import { TaxesService } from '../../service/taxes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taxes-likes',
  templateUrl: './taxes-likes.component.html',
  styleUrls: ['./taxes-likes.component.scss'],
})
export class TaxesLikesComponent implements OnInit {
  constructor(private service: TaxesService, private route: ActivatedRoute) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.likeId = params.id;
      this.getAllTaxes();
    });
  }

  getAllTaxes() {
    const list = {
      type: 'asset',
      id: this.likeId,
    };
    this.service.taxesLikesList(list).subscribe(
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
