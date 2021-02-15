import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../../../service/tags.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-active-comments',
  templateUrl: './active-comments.component.html',
  styleUrls: ['./active-comments.component.scss'],
})
export class ActiveCommentsComponent implements OnInit {
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
      status: 1,
      type: 'asset',
      id: this.commentId,
    };
    this.service.tagsCommentsList(list).subscribe(
      (res: any) => {
        console.log('comment/type/id', res);
        if (res.data && res.data.length > 0) {
          this.userActive = res.data;
          this.totRecords = res.totalCount;
          console.log(res);
          // res.data.comments.map(x => {
          //   x.firstName =
          //     x.commentedBy.firstName + ' ' + x.commentedBy.lastName
          // })
          console.log(res.data);
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

  /**
   *
   * @description for using deleting the comments
   * @param resonText take reason why we delete comment
   * @author bhavesh jain
   *  @returns delete selected comments
   */
  commentDelete(resonText) {
    const list = {
      commentId: this.statusId,
      status: 2,
      reason: resonText,
    };
    console.log(list);
    this.service.deleteActiveComments(list).subscribe(
      (res: any) => {
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

  /**
   * @author bhavesh jain
   * @description call the delete modal popup on active comment module
   * @param statuss show text according to status
   * @returns after submit we get reasons
   */
  deleteComments(statuss: number) {
    const titles = statuss === 6 ? 'Delete' : 'Suspend';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: titles,
          reason: true,
          content: 'Are you sure you want to ' + titles + ' it ?',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.commentDelete(res);
        }
      });
  }
}
