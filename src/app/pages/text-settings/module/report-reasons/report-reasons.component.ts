import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-reasons',
  templateUrl: './report-reasons.component.html',
  styleUrls: ['./report-reasons.component.scss'],
})
export class ReportReasonsComponent implements OnInit {
  constructor() {}

  reportType = '1';

  tabList: any;

  ngOnInit() {}

  listOnTable(val: string) {
    console.log('report', val);
    console.log(typeof val);
    this.reportType = val;
    const titles =
      val === '2'
        ? 'Report User Reasons'
        : val === '3'
        ? 'Delete Account Reasons'
        : 'Report Ads Reasons';
    // const titles = val==2?'Report User Reasons':'Report Ads Reasons';
    this.tabList = titles;
  }

  selectTab(event) {
    this.tabList = event.tabTitle;
  }
}
