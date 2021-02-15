import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
})
export class AssetTypeComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  allDataList: any;
  tabList: any;

  ngOnInit() {}

  listOnTable(val: any) {
    const list = {
      data: val || '',
    };
    this.allDataList = list;
  }

  selectTab(event) {
    this.tabList = event.tabTitle;
    // this.spinner.show();
    // setTimeout(()=>{
    //   this.spinner.hide();
    // }, 100)
  }
}
