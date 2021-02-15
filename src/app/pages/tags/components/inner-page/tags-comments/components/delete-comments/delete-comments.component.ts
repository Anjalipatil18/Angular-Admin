import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../../../service/tags.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-delete-comments',
  templateUrl: './delete-comments.component.html',
  styleUrls: ['./delete-comments.component.scss'],
})
export class DeleteCommentsComponent implements OnInit {
  constructor(
    private service: TagsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  commentId: any;
  tabList: any;
  limit = 10;
  totRecords: any;
  statusId: any = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.commentId = params.id;
      this.getAllTags();
    });
  }

  getAllTags(event?) {
    const list = {
      skip: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 2,
      id: this.commentId,
    };
    this.service.tagsCommentsList(list).subscribe(
      (res: any) => {
        console.log('comment/type/id', res);
        if (res.data && res.data.length > 0) {
          this.userActive = res.data;
          this.totRecords = res.totalCount;

          // res.data.comments.map(x => {
          //   x.firstName =
          //     x.commentedBy.firstName + ' ' + x.commentedBy.lastName
          // })
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

  usersDelete(statuss) {
    console.log(statuss);
    const list = {
      status: statuss,
      assetId: this.statusId,
      byAdmin: 1,
    };
    // console.log(list)
    this.service.deleteTagList(list).subscribe(
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
    const titles = status === 6 ? 'Delete' : 'Suspend';
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
