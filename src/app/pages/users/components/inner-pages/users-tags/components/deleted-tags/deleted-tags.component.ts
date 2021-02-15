import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../../service/users.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-deleted-tags',
  templateUrl: './deleted-tags.component.html',
  styleUrls: ['./deleted-tags.component.scss'],
})
export class DeletedTagsComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  userActiveSearch: any;
  columns: any;
  userId: any;
  statusId = [];
  constructor(
    private location: Location,
    private service: UsersService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
    this.getAllTags();
  }

  back() {
    this.location.back();
  }

  getAllTags() {
    const list = {
      status: 4,
      userId: this.userId,
    };
    this.service.tagUsers(list).subscribe(
      (res: any) => {
        console.log('assets/users/4', res);
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
          data.title.en &&
          data.title.en.toUpperCase().indexOf(value.toUpperCase()) > -1
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
