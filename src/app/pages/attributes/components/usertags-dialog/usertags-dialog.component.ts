import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Configuration } from 'src/app/global/global-config';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AttributesService } from '../service/attributes.service';

@Component({
  selector: 'app-usertags-dialog',
  templateUrl: './usertags-dialog.component.html',
  styleUrls: ['./usertags-dialog.component.scss'],
})
export class UsertagsDialogComponent implements OnInit {
  constructor(
    protected ref: NbDialogRef<UsertagsDialogComponent>,
    private service: AttributesService,
    private conf: Configuration
  ) {}

  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  reason = '';

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  artists = [];
  dragDrop = false;
  attributesGroupIds = [];
  alteArtists = [];

  dragSearch: any;
  dragData: any;
  language: any;
  ngOnInit() {
    console.log(this.content);
    this.getAllModels();
    this.language = this.conf.getItem('lan');
  }

  cancel() {
    this.alteArtists.map(x => {
      const index = this.artists.findIndex(y => y === x);
      if (index === -1) {
        this.content.content.push(x);
      }
    });

    this.alteArtists = [];
    this.content.drag = [];
    this.ref.close(this.alteArtists);
  }

  submit() {
    // this.alteArtists['drag']=false;
    // this.attributesGroupIds = [];
    // this.alteArtists.map(x=>{
    //   const index = this.attributesGroupIds.findIndex(y=>y == x);
    //   if(index == -1){
    //     this.alteArtists = [...this.attributesGroupIds, x]
    //   }
    // })
    this.ref.close(this.alteArtists);
  }
  getAllModels() {
    // var contentArr = this.content['content'];
    // var dragArr = [];
    // this.content['content']['drag'].map((data) => {
    //   const index = this.content['content'].findIndex(arr => arr._id == data);
    //   console.log('search ids index', index);
    //   dragArr.push(this.content['content'][index]);
    //   contentArr.splice(this.content['content'][index], 1);
    //   console.log('pushed data', dragArr, contentArr);
    // })
    this.artists = this.content.content;
    this.alteArtists = this.content.drag ? this.content.drag : [];
    this.dragData = this.content.content;
    this.dragDrop = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (
      event.container.data &&
      event.container.data !== event.previousContainer.data &&
      event.previousContainer !== event.container
    ) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // moveItemInArray(this.artists, event.previousIndex, event.currentIndex);
    }

    // this.artists.map(x=>{
    //   const index = this.alteArtists.findIndex(y=>y == x);
    //   console.log("index dragged", index)
    //   if(index == -1){
    //     this.alteArtists.push(x);
    //   }
    // })

    // this.attributesGroupIds = [];
    // this.alteArtists.map(x=>{
    //   const index = this.attributesGroupIds.findIndex(y=>y == x);
    //   if(index == -1){
    //     this.alteArtists.push(x)
    //   }
    // });
  }
  searchGroup(value) {
    console.log(value);
    console.log(value.toUpperCase());
    this.dragSearch = [];
    // this.dragData = [];
    if (value && this.dragData && this.dragData.length > 0) {
      this.dragData.map(data => {
        console.log(data);
        if (
          data[`brands_${this.language}`]
            .toUpperCase()
            .indexOf(value.toUpperCase()) > -1
        ) {
          this.dragSearch.push(data);
        }
      });
      this.artists = this.dragSearch;
    } else {
      this.artists = this.dragData;
    }
  }
  getBrandLang(val) {
    // console.log("brands", val);
    const val1 = `brands_${this.language}`;
    // let splitVal = val.brands.split("_")[0];
    return val[val1];
  }
}
