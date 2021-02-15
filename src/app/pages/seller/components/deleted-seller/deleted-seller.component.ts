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
import { UsersellerDialogComponent } from '../inner-page/userseller-dialog/userseller-dialog.component';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
@Component({
  selector: 'app-deleted-seller',
  templateUrl: './deleted-seller.component.html',
  styleUrls: ['./deleted-seller.component.scss'],
})
export class DeletedSellerComponent implements OnInit {
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
      statusText: 'Deleted',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.sellerList(list).subscribe(
      (res: any) => {
        this.totRecords = res.recordsTotal;
        this.userActive = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  permanantDelete(status) {
    console.log('value----------', status);
    const titles = 'PermanentDelete';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          reason: true,
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

  usersDelete(status, res) {
    const data = {
      id: status,
      reason: res,
    };
    this.service.deletePermanent(data).subscribe(
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
