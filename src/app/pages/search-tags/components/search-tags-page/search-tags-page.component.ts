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
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { SearchtagService } from '../service/searchtag.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

@Component({
  selector: 'app-search-tags-page',
  templateUrl: './search-tags-page.component.html',
  styleUrls: ['./search-tags-page.component.scss'],
})
export class SearchTagsPageComponent implements OnInit {
  constructor(
    private service: SearchtagService,
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

  deleteCities: any = [];
  deleteCountry: any;

  listFilter = [
    { title: 'Recent on Top', id: '1' },
    { title: 'Oldest on Top', id: '2' },
    { title: 'High to Low', id: '3' },
    { title: 'Low to High', id: '4' },
    { title: 'Date Range Picker', id: '5' },
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
          this.getSearchTagData('', text);
        } else {
          this.getSearchTagData();
        }
      });
    this.getSearchTagData();
  }

  /**
   * @description get data for search tags
   * @date 2020-02-05
   * @param * [event] for pagination
   * @param * [searchKey] for searching data
   */
  getSearchTagData(event?, searchKey?) {
    console.log(event);
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      search: searchKey ? searchKey : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.searchTag(list).subscribe(
      (res: any) => {
        console.log('getSearchTagData---------->', res);
        this.totRecords = res.data.length;
        this.userActive = res.data;
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  reportCheckbox(event, id, name, indx) {
    this.deleteCountry = this.userActive[indx].name;
    this.deleteCities.push(this.userActive[indx].cities);
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
      searchTagIds: this.statusId,
    };
    this.service.deleteTagList(list).subscribe(
      (res: any) => {
        this.statusId = [];
        this.userActive = [];
        this.getSearchTagData();
        console.log('delete====>', res);
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

  filterPrice(event) {
    console.log('filter event', event);
    this.eventValue = event === 5 ? true : false;
    const list = {
      id: 1,
      trigger: event,
    };
    if (event < 5) {
      this.getSearchTagData(list);
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
      this.getSearchTagData(list);
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
