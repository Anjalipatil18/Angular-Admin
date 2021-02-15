import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleted-scenes',
  templateUrl: './deleted-scenes.component.html',
  styleUrls: ['./deleted-scenes.component.scss'],
})
export class DeletedScenesComponent implements OnInit {
  userActiveData: any = [];
  userActive: any;
  columns: any;
  constructor() {}

  ngOnInit() {}

  searchVerifiedActive(value) {}
}
