import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suspended-scenes',
  templateUrl: './suspended-scenes.component.html',
  styleUrls: ['./suspended-scenes.component.scss'],
})
export class SuspendedScenesComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  columns: any;
  constructor() {}

  ngOnInit() {}

  searchVerifiedActive(value) {}
}
