import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss'],
})
export class AppConfigComponent implements OnInit {
  constructor() {}

  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
