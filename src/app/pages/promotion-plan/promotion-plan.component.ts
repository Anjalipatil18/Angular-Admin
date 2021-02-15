import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-plan',
  templateUrl: './promotion-plan.component.html',
  styleUrls: ['./promotion-plan.component.scss'],
})
export class PromotionPlanComponent implements OnInit {
  constructor() {}
  tabList: any;

  ngOnInit() {}
  selectTab(event) {
    //  console.log(event.tabTitle)
    this.tabList = event.tabTitle;
  }
}
