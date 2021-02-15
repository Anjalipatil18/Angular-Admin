import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  constructor() {}
  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
