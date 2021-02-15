import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotors',
  templateUrl: './promotors.component.html',
  styleUrls: ['./promotors.component.scss'],
})
export class PromotorsComponent implements OnInit {
  constructor() {}
  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    this.tabList = event.tabTitle;
  }
}
