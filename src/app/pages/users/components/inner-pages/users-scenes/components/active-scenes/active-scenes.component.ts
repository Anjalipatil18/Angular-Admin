import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-scenes',
  templateUrl: './active-scenes.component.html',
  styleUrls: ['./active-scenes.component.scss'],
})
export class ActiveScenesComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  columns: any;
  constructor() {}

  ngOnInit() {}

  searchVerifiedActive(value) {}
}
