import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../service/tags.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags-comments',
  templateUrl: './tags-comments.component.html',
  styleUrls: ['./tags-comments.component.scss'],
})
export class TagsCommentsComponent implements OnInit {
  constructor(private service: TagsService, private route: ActivatedRoute) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  commentId: any;
  tabList: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.commentId = params.id;
      this.getAllTags();
    });
  }

  getAllTags() {
    const list = {
      type: 'asset',
      id: this.commentId,
    };
    this.service.tagsCommentsList(list).subscribe(
      (res: any) => {
        console.log('comment/type/id', res);
        if (res.data && res.data.length > 0) {
          this.userActive = res.data.comments;
          res.data.comments.map(x => {
            x.firstName =
              x.commentedBy.firstName + ' ' + x.commentedBy.lastName;
          });
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
  selectTab(event) {
    console.log(event.tabTitle);
    this.tabList = event.tabTitle;
  }
}
