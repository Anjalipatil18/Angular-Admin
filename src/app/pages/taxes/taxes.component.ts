import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss'],
})
export class TaxesComponent implements OnInit {
  constructor() {}
  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
