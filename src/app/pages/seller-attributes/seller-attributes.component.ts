import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './seller-attributes.component.html',
  styleUrls: ['./seller-attributes.component.scss'],
})
export class SellerAttributesComponent implements OnInit {
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
