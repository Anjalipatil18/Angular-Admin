import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-users-tags',
  templateUrl: './users-tags.component.html',
  styleUrls: ['./users-tags.component.scss'],
})
export class UsersTagsComponent implements OnInit {
  constructor(private location: Location) {}

  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }

  back() {
    this.location.back();
  }
}
