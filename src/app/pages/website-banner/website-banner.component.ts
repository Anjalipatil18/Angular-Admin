import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-banner',
  templateUrl: './website-banner.component.html',
  styleUrls: ['./website-banner.component.scss'],
})
export class WebsiteBannerComponent implements OnInit {
  constructor() {}
  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
