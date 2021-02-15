import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../service/tags.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsertagsDialogComponent } from '../../inner-page/usertags-dialog/usertags-dialog.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-tags-likes',
  templateUrl: './tags-likes.component.html',
  styleUrls: ['./tags-likes.component.scss'],
})
export class TagsLikesComponent implements OnInit {
  constructor(
    private service: TagsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.likeId = params.id;
      this.getAllTags();
    });
  }

  getAllTags() {
    const list = {
      type: 'asset',
      id: this.likeId,
    };
    this.service.tagsLikesList(list).subscribe(
      (res: any) => {
        console.log('like/type/id', res.data);
        if (res.data) {
          this.userActive = res.data;
          this.totRecords = res.totalCount;
          console.log(this.totRecords);
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
  openDialog(data) {
    this.dialogService
      .open(UsertagsDialogComponent, {
        context: {
          action: false,
          title: 'User Details',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
        //  if(res){
        //    this.listTable.emit(1);
        //    this.statusId = [];
        //    this.userActive=[];
        //  }
      });
  }
}
