import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  constructor() {}

  allDataList: any;

  ngOnInit() {}

  listOnTable(val: any) {
    const list = {
      data: val,
    };
    this.allDataList = list;
  }
}
