import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PromotionPlanService } from '../service/promotion-plan.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';
import { faTabletAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { DialogContentComponent } from '../../../../../app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-active-promotion-plan',
  templateUrl: './active-promotion-plan.component.html',
  styleUrls: ['./active-promotion-plan.component.scss'],
})
export class ActivePromotionPlanComponent implements OnInit {
  constructor(
    private service: PromotionPlanService,
    private dialogService: NbDialogService,
    private serviceType: AssetTypeService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  faMobileAlt = faMobileAlt;

  eventValue: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  listFilter = [
    { title: 'Recent on Top', id: '1' },
    { title: 'Oldest on Top', id: '2' },
    { title: 'High to Low', id: '3' },
    { title: 'Low to High', id: '4' },
    // { title: 'Date Range Picker', id: '5' },
    //  {title:'AssetType', id:"6"},
    //  {title:'assetSubType (assetSubtypeId)', id:"7"},
    //  {title:'assetSubSubType (assetSubSubtypeId)', id:"8"},
    //  {title:'LISTED ON MARKETPLACE (marketPlaceStatusCode)', id:"9"},
    //  {title:'PRIVATE TAG (marketPlaceStatusCode)', id:"10"},
    //  {title:'BOTH  (marketPlaceStatusCode)', id:"11"},
  ];
  @ViewChild('attributeSearchGroup', { static: true })
  attributeSearchGroup: ElementRef;
  ngOnInit() {
    fromEvent(this.attributeSearchGroup.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        console.log(text);
        if (text.length) {
          this.getAllTags('', '', text);
        } else {
          this.getAllTags();
        }
      });
    this.getAllTags();
  }

  getAllTags(event?, sortName?, searchKey?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'Active',
      userId: '',
      searchedKey: searchKey ? searchKey : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.purchasePlanList(list).subscribe(
      (res: any) => {
        this.totRecords = res.data.length;
        this.userActive = res.data;
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  searchVerifiedActive(event, value) {
    this.userActiveSearch = [];
    this.userActiveData = [];

    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'Active',
      userId: '',
      search: value,
      // sort:sortName,
      // q:text
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.purchaseSearchPlanList(list, event).subscribe(
      (res: any) => {
        console.log('userActiveData search active **********', res);
        this.totRecords = res.data.length;
        this.userActiveData = res.data;
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
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
    console.log(status);
    const list = {
      status: 'InActive',
      ids: this.statusId,
    };
    // console.log(list)
    this.service.deletePromotionPlan(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllTags();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUnits(status) {
    const titles = status === 2 ? 'Delete' : 'Suspend';
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
          this.usersDelete(titles);
        }
      });
  }

  filterPrice(event) {
    let eventName;
    switch (event) {
      case '1':
        eventName = 'new_desc';
        break;
      case '2':
        eventName = 'new_asc';
        break;
      case '3':
        eventName = 'price_desc';
        break;
      case '4':
        eventName = 'price_asc';
        break;
      default:
    }
    this.eventValue = event === 5 ? true : false;
    const list = {
      id: 1,
      sort: eventName,
    };
    console.log(list);
    if (event < 5) {
      this.getAllTags(list, list.sort);
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
      this.getAllTags(list);
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
