import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../service/tags.service';

@Component({
  selector: 'app-tags-views',
  templateUrl: './tags-views.component.html',
  styleUrls: ['./tags-views.component.scss'],
})
export class TagsViewsComponent implements OnInit {
  constructor(private service: TagsService) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags() {
    const list = {
      set: 0,
      limit: 10,
      status: 1,
    };
    // this.service.tagsList(list).subscribe(
    //   (res: any) => {
    //     console.log('assets/1', res)
    //     this.userActive = res.result;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.username &&
          data.username.toUpperCase().indexOf(value.toUpperCase()) > -1
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
