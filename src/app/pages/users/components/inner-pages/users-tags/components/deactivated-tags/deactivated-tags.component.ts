import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../../service/users.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { TagsService } from 'src/app/pages/tags/components/service/tags.service';

@Component({
  selector: 'app-deactivated-tags',
  templateUrl: './deactivated-tags.component.html',
  styleUrls: ['./deactivated-tags.component.scss'],
})
export class DeactivatedTagsComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  userActiveSearch: any;
  columns: any;
  userId: any;
  statusId = [];
  constructor(
    private location: Location,
    private serviceTag: TagsService,
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
      status: 2,
      userId: this.userId,
    };
    this.service.tagUsers(list).subscribe(
      (res: any) => {
        console.log('assets/users/0', res);
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

  reportCheckbox(event, id) {
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
  }

  usersDelete(status) {
    const list = {
      statusCode: status,
      assetId: this.statusId,
      byAdmin: 1,
    };
    console.log(list);
    this.serviceTag.deleteTagList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllTags();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTags(status) {
    const titles = status === 4 ? 'Delete' : 'Active';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: titles,
          content: 'Are you sure you want to ' + titles + ' it ?',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.usersDelete(status);
        }
      });
  }
}
