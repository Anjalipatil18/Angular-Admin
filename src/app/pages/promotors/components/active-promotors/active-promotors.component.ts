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
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UserpromotorsDialogComponent } from '../inner-page/userpromotors-dialog/userpromotors-dialog.component';

import { PromotorsService } from '../service/promotors.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

@Component({
  selector: 'app-active-promotors',
  templateUrl: './active-promotors.component.html',
  styleUrls: ['./active-promotors.component.scss'],
})
export class ActivePromotorsComponent implements OnInit {
  constructor(
    private service: PromotorsService,
    private dialogService: NbDialogService,
    private serviceType: AssetTypeService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];

  eventValue: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;
  @ViewChild('colors', { static: false }) citySearchInput: ElementRef;

  listFilter = [
    { title: 'Recent on Top', id: '1' },
    { title: 'Oldest on Top', id: '2' },
    { title: 'High to Low', id: '3' },
    { title: 'Low to High', id: '4' },
    { title: 'Date Range Picker', id: '5' },
  ];
  @ViewChild('promoterSearch', { static: true })
  promoterSearchInput: ElementRef;
  ngOnInit() {
    fromEvent(this.promoterSearchInput.nativeElement, 'keyup')
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
          this.getAllPromotors('', text);
        } else {
          this.getAllPromotors();
        }
      });
    this.getAllPromotors();
  }

  getAllPromotors(event?, searchKey?) {
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      set: eve * 10,
      limit: this.limit,
      status: 1,
      statusText: 'pending',
      searchKey: searchKey ? searchKey : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.promotorsList(list).subscribe(
      (res: any) => {
        console.log('promoter/pending', res);
        this.totRecords = res.data.length;
        this.userActive = res.data;
        console.log(
          '/////////this.userActive promotors///////',
          this.userActive
        );
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.firstName &&
          data.firstName.toLowerCase().includes(value.toLowerCase())
        ) {
          this.userActiveSearch.push(data);
        } else if (
          data.email &&
          data.email.toLowerCase().includes(value.toLowerCase())
        ) {
          this.userActiveSearch.push(data);
        } else if (
          data.phoneNumber &&
          data.phoneNumber.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
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

  usersDelete(status, ress) {
    const statusCode = status === 2 ? 'rejected' : 'approved';
    const list = {
      userIds: this.statusId,
      // pin: '12345',
      promoter: statusCode,
      reason: ress,
    };
    this.service.deleteTagList(list).subscribe(
      (res: any) => {
        console.log('res', res);
        this.statusId = [];
        this.userActive = [];
        this.getAllPromotors();
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePromotors(status) {
    const titles = status === 2 ? 'Deny' : 'Approve';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          reason: status === 2 ? true : false,
          action: false,
          title: titles,
          content: '',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.usersDelete(status, res);
        }
      });
  }
  approvePromotors(status) {
    const list = {
      userIds: this.statusId,
      pin: '12345',
      promoter: 'approved',
    };
    this.service.approveTagList(list).subscribe(
      (res: any) => {
        this.userActive = [];
        this.getAllPromotors();
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(data) {
    this.dialogService
      .open(UserpromotorsDialogComponent, {
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
      });
  }

  filterPrice(event) {
    this.eventValue = event === 5 ? true : false;
    const list = {
      id: 1,
      trigger: event,
    };
    if (event < 5) {
      this.getAllPromotors(list);
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
    if (list.endDateTime) {
      this.getAllPromotors(list);
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
      },
      error => {
        console.log(error);
      }
    );
  }
}
