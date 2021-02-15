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
import { UsercolorsDialogComponent } from '../inner-page/usercolors-dialog/usercolors-dialog.component';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { ColorsService } from '../service/colors.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-active-colors',
  templateUrl: './active-colors.component.html',
  styleUrls: ['./active-colors.component.scss'],
})
export class ActiveColorsComponent implements OnInit {
  constructor(
    private service: ColorsService,
    private dialogService: NbDialogService,
    private serviceType: AssetTypeService
  ) {}
  faCircle = faCircle;
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  @ViewChild('colors', { static: true }) colorSearchInput: ElementRef;
  eventValue: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

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
    fromEvent(this.colorSearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then 2
        // ,filter(res => res.length > 2)
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        // console.log(text);
        // const temp = text.length ? text :  this.getAllRating();
        if (text.length) {
          // this.service.colorsSearch(text).subscribe(
          //   (res: any) => {
          //     // console.log('countries1111111111---------->', res);
          //     this.totRecords = res.recordsTotal
          //     this.userActive = res.data
          //     // this.userActive.map((data, index) => {
          //     //   data.username == '' ? this.userActive[index].username = 'admin' : this.userActive[index].username;
          //     // })
          //   },
          //   error => {
          //     this.userActive = []
          //     console.log('eroor', error)
          //   }
          // )
          this.getAllColors('', text);
        } else {
          this.getAllColors();
        }
      });
    this.getAllColors();
  }

  // set color
  setColor(row) {
    const elseZero = '0';
    const vals = row.R ? row.R : elseZero;
    const val = row.G ? row.G : elseZero;
    const valss = row.B ? row.B : elseZero;
    return `rgb(${row.R}, ${row.G}, ${row.B})`;
  }

  // get colors api
  getAllColors(event?, searchValue?) {
    let list;
    if (typeof event === 'object' && event.name) {
      const evenets = event.offset && event.page ? event.page - 1 : 0;
      list = {
        offset: evenets * 10,
        limit: this.limit,
        type: event.type,
        name: event.name,
        r: event.r,
        g: event.g,
        b: event.b,
      };
    } else {
      const eve = event && event.page ? event.page - 1 : 0;
      list = {
        offset: eve * 10,
        limit: this.limit,
        name: searchValue ? searchValue : '',
      };
    }
    console.log('get colors data before api', list, event);
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.colorsList(list, event).subscribe(
      (res: any) => {
        console.log('assets/1', res);
        this.totRecords = res.recordsTotal;
        this.userActive = res.data;
        this.userActive.map((data, index) => {
          const val =
            data.username === ''
              ? (this.userActive[index].username = 'admin')
              : this.userActive[index].username;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    const searchType = value.indexOf(':') <= -1;
    let rgbValues;
    let list;
    if (!searchType) {
      rgbValues = value.split(':');
      list = {
        offset: 0,
        type: searchType ? 'name' : 'RGB',
        name: value,
        r: rgbValues[0],
        g: rgbValues[1],
        b: rgbValues[2],
      };
    } else {
      list = {
        offset: 0,
        type: searchType ? 'name' : 'RGB',
        name: value,
      };
    }
    this.userActiveSearch = [];
    this.userActiveData = [];
    this.getAllColors(list);
  }

  reportCheckbox(event, id) {
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
    const list = {
      // statusCode:status,
      ids: this.statusId,
      // byAdmin:1
    };
    // console.log(list)
    this.service.deleteColorsList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllColors();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteColors(status) {
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

  openDialog(data?, type?) {
    this.dialogService
      .open(UsercolorsDialogComponent, {
        context: {
          colors: type ? true : false,
          action: false,
          title: type ? 'Add Color' : 'User Details',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        console.log('modal result', res);
        this.addColors(res);
      });
  }

  //  add colors
  addColors(data) {
    const list = {
      name: data.colorName,
      R: data.rCode,
      G: data.gCode,
      B: data.bCode,
    };
    console.log('add colors data', list);
    this.service.addColorsList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        // this.statusId=[];
        this.userActive = [];
        this.getAllColors();
        console.log('add colors', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  filterPrice(event) {
    console.log('filter event', event);
    this.eventValue = event === 5 ? true : false;
    const list = {
      id: 1,
      trigger: event,
    };
    if (event < 5) {
      this.getAllColors(list);
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
      this.getAllColors(list);
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
