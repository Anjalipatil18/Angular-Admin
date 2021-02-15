import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-scenes',
  templateUrl: './users-scenes.component.html',
  styleUrls: ['./users-scenes.component.scss'],
})
export class UsersScenesComponent implements OnInit {
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
