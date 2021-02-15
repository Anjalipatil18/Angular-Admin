import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
@Component({
  selector: 'app-users-follow',
  templateUrl: './users-follow.component.html',
  styleUrls: ['./users-follow.component.scss'],
})
export class UsersFollowComponent implements OnInit {
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  userId: any;
  statusCode: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: UsersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.statusCode = params.sCode;
      this.userId = params.id;
    });
    this.getAllFollow();
  }

  back() {
    this.location.back();
  }

  getAllFollow() {
    const list = {
      statusCode: this.statusCode,
      userId: this.userId,
    };
    this.service.tagFollow(list).subscribe(
      (res: any) => {
        console.log('follow/' + this.statusCode, res);
        this.userActive = res.data;
      },
      error => {
        this.userActive = [];
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
