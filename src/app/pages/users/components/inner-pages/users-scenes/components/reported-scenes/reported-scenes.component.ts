import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reported-scenes',
  templateUrl: './reported-scenes.component.html',
  styleUrls: ['./reported-scenes.component.scss'],
})
export class ReportedScenesComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  columns: any;
  constructor() {}

  ngOnInit() {}

  searchVerifiedActive(value) {}
}
