import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
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
