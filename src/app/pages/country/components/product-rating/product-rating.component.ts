import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UserratingDialogComponent } from '../inner-page/userrating-dialog/userrating-dialog.component';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { RatingService } from '../service/rating.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss'],
})
export class ProductRatingComponent implements OnInit {
  constructor(
    private service: RatingService,
    private dialogService: NbDialogService,
    private serviceType: AssetTypeService
  ) {}
  userQuestionUpdate = new Subject<string>();
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  @ViewChild('sTax', { static: true }) citySearchInput: ElementRef;
  eventValue: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  // searchVerifiedActive(value) {
  //   this.userActiveSearch = [];
  //   this.userActiveData = [];
  //   if (value && this.userActive && this.userActive.length > 0) {
  //     this.userActiveData = this.userActive;
  //     this.userActiveData.map(data => {
  //       if (data.cities &&
  //         data.cities
  //           .toUpperCase()
  //           .indexOf(value.toUpperCase()) > -1
  //       ) {
  //         this.userActiveSearch.push(data);
  //       }
  //     });
  //     this.userActiveData = this.userActiveSearch;
  //   } else {
  //     console.log("else");
  //   }
  // }

  deleteCities: any = [];
  deleteCountry: any;

  listFilter = [
    { title: 'Recent on Top', id: '1' },
    { title: 'Oldest on Top', id: '2' },
    { title: 'High to Low', id: '3' },
    { title: 'Low to High', id: '4' },
    { title: 'Date Range Picker', id: '5' },
    //  {title:'AssetType', id:"6"},
    //  {title:'assetSubType (assetSubtypeId)', id:"7"},
    //  {title:'assetSubSubType (assetSubSubtypeId)', id:"8"},
    //  {title:'LISTED ON MARKETPLACE (marketPlaceStatusCode)', id:"9"},
    //  {title:'PRIVATE TAG (marketPlaceStatusCode)', id:"10"},
    //  {title:'BOTH  (marketPlaceStatusCode)', id:"11"},
  ];

  ngOnInit() {
    fromEvent(this.citySearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        if (text.length) {
          this.service.searchList(text).subscribe(
            (res: any) => {
              this.totRecords = res.recordsTotal;
              this.userActive = res.data;
            },
            error => {
              this.userActive = [];
              console.log('eroor', error);
            }
          );
        } else {
          this.getAllRating();
        }
      });
    this.getAllRating();
  }

  getAllRating(event?) {
    console.log(event);
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      set: eve * 10,
      limit: this.limit,
      // status:1
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.ratingList(list, event).subscribe(
      (res: any) => {
        console.log('countries---------->', res);
        this.totRecords = res.recordsTotal;
        this.userActive = res.data;
        // this.userActive.map((data, index) => {
        //   data.username == '' ? this.userActive[index].username = 'admin' : this.userActive[index].username;
        // })
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }
  reportCheckbox(event, id, name, indexs) {
    this.deleteCountry = this.userActive[indexs].name;
    this.deleteCities.push(this.userActive[indexs].cities);
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
  }

  usersDelete(status) {
    // let list ={
    //   statusCode:status,
    //   assetId:this.statusId,
    //   byAdmin:1
    // }
    const list = {
      countryName: this.deleteCountry,
      citiesToRemove: this.deleteCities,
    };
    this.service.deleteTagList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllRating();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRating(status) {
    const titles = status === 4 ? 'Delete' : 'Suspend';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: titles,
          content: 'Are you sure you want to ' + titles + ' it ?',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.usersDelete(status);
        }
      });
  }

  openDialog(data) {
    this.dialogService
      .open(UserratingDialogComponent, {
        context: {
          action: false,
          title: 'User Details',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
        //  if(res){
        //    this.listTable.emit(1);
        //    this.statusId = [];
        //    this.userActive=[];
        //  }
      });
  }

  filterPrice(event) {
    console.log('filter event', event);
    this.eventValue = event === 5 ? true : false;
    const list = {
      id: 1,
      trigger: event,
    };
    if (event < 5) {
      this.getAllRating(list);
    }
  }
  dateRangeListList(event) {
    const data = event.target.value.split(' ');
    const list = {
      id: 2,
      trigger: 5,
      startDateTime: data[0] + '%2000:00:00',
      endDateTime: data[2] ? data[2] + '%2000:00:00' : '',
    };
    // console.log(list.endDateTime)
    if (list.endDateTime) {
      this.getAllRating(list);
    }
  }

  getAllTypes() {
    const list = {
      set: 0,
      limit: 10,
      status: 1,
      trigger: 1,
    };
    this.serviceType.assetsTypeList(list).subscribe(
      (res: any) => {
        console.log('assetsType/1', res);
        // res.result.sort((a, b) => a.seqId - b.seqId);
        // this.userActive = res.result;
        // this.aciveGroupData = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }
}
