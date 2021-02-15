import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { SellerService } from '../service/seller.service';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UsersellerDialogComponent } from '../inner-page/userseller-dialog/userseller-dialog.component';

@Component({
  selector: 'app-reported-seller',
  templateUrl: './reported-seller.component.html',
  styleUrls: ['./reported-seller.component.scss'],
})
export class ReportedSellerComponent implements OnInit {
  constructor(
    private service: SellerService,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  ngOnInit() {
    this.getAllSeller();
  }

  getAllSeller(event?) {
    const list = {
      offset: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      userId: '',
      statusText: 'Approved',
    };
    this.service.sellerList(list).subscribe(
      (res: any) => {
        console.log('seller/approved', res);
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
    const statusCode = status === 2 ? 'Deleted' : 'Suspended';
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
    const titles = status === 2 ? 'Delete' : 'Suspend';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          reason: true,
          action: false,
          title: titles,
          content: 'Are you sure you want to ' + titles + ' it ?',
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
}
