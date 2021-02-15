import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../../service/users.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { TagsService } from 'src/app/pages/tags/components/service/tags.service';

@Component({
  selector: 'app-active-tags',
  templateUrl: './active-tags.component.html',
  styleUrls: ['./active-tags.component.scss'],
})
export class ActiveTagsComponent implements OnInit {
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
    private dialogService: NbDialogService,
    private serviceTag: TagsService
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
      status: 1,
      userId: this.userId,
    };
    this.service.tagUsers(list).subscribe(
      (res: any) => {
        console.log('assets/users/1', res);
        this.userActive = res.result;
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
    const titles = status === 4 ? 'Delete' : 'Deactivate';
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
