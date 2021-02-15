import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { TaxesService } from '../service/taxes.service';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-deactivated-taxes',
  templateUrl: './deactivated-taxes.component.html',
  styleUrls: ['./deactivated-taxes.component.scss'],
})
export class DeactivatedTaxesComponent implements OnInit {
  constructor(
    private service: TaxesService,
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
    // this.getAllTaxes();
  }

  getAllTaxes(event?) {
    console.log('event ........', event);
    const list = {
      offset: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'Deleted',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.taxesList(list).subscribe(
      (res: any) => {
        console.log('taxes deleted', res);
        // this.totRecords = res.data.length;
        // this.userActive = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTaxes(status) {
    const titles = status === 2 ? 'Active' : 'Suspend';
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
  usersDelete(status) {
    const list = {
      statusCode: status,
      assetId: this.statusId,
      byAdmin: 1,
    };
    // console.log(list)
    this.service.deleteTaxesList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllTaxes();
        console.log('deleteAssets', res);
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
          data.username &&
          data.username.toUpperCase().indexOf(value.toUpperCase()) > -1
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
}
