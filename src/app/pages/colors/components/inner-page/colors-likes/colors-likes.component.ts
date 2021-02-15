import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../service/colors.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colors-likes',
  templateUrl: './colors-likes.component.html',
  styleUrls: ['./colors-likes.component.scss'],
})
export class ColorsLikesComponent implements OnInit {
  constructor(private service: ColorsService, private route: ActivatedRoute) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.likeId = params.id;
      this.getAllColors();
    });
  }

  getAllColors() {
    const list = {
      type: 'asset',
      id: this.likeId,
    };
    this.service.colorsLikesList(list).subscribe(
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
