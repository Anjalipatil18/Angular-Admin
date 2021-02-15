import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-group',
  templateUrl: './attribute-group.component.html',
  styleUrls: ['./attribute-group.component.scss'],
})
export class AttributeGroupComponent implements OnInit {
  constructor() {}

  allDataList: any;

  tabList: any;

  ngOnInit() {}

  listOnTable(val: any) {
    const list = {
      data: val,
    };
    this.allDataList = list;
  }
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
