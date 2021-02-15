import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UsersellerDialogComponent } from '../inner-page/userseller-dialog/userseller-dialog.component';

import { SellerService } from '../service/seller.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

@Component({
  selector: 'app-active-seller',
  templateUrl: './active-seller.component.html',
  styleUrls: ['./active-seller.component.scss'],
})
export class ActiveSellerComponent implements OnInit {
  constructor(
    private service: SellerService,
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

  listFilter = [
    { title: 'Recent on Top', id: '1' },
    { title: 'Oldest on Top', id: '2' },
    { title: 'High to Low', id: '3' },
    { title: 'Low to High', id: '4' },
    { title: 'Date Range Picker', id: '5' },
  ];

  ngOnInit() {
    this.getAllSeller();
  }

  getAllSeller(event?) {
    const list = {
      offset: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      userId: '',
      statusText: 'Pending',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.sellerList(list).subscribe(
      (res: any) => {
        console.log('promoter/pending', res);
        this.totRecords = res.recordsTotal;
        this.userActive = res.data;
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

  usersDelete(status, res) {
    const statusCode = status === 2 ? 'Rejected' : 'Approved';
    const list = {
      ids: this.statusId,
      sellerStatus: statusCode,
      reason: res,
      // userIds: this.statusId,
      // pin: '12345',
      // promoter: statusCode,
      // reason: res
    };
    this.service.deleteSellerList(list).subscribe(
      (ress: any) => {
        this.statusId = [];
        this.userActive = [];
        this.getAllSeller();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteSeller(status) {
    const titles = status === 2 ? 'Reject' : 'Accept';
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

  approveSeller(status) {
    const list = {
      userIds: this.statusId,
      pin: '12345',
      promoter: 'approved',
    };
    this.service.approveTagList(list).subscribe(
      (res: any) => {
        this.userActive = [];
        this.getAllSeller();
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(data) {
    this.dialogService
      .open(UsersellerDialogComponent, {
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
      this.getAllSeller(list);
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
      this.getAllSeller(list);
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
