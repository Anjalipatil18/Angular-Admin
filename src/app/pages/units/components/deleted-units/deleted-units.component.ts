import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UnitsService } from '../service/units.service';
// import { UserUnitsDialogComponent } from '../inner-page/userunits-dialog/userunits-dialog.component'
import { DialogContentComponent } from '../../../../../app/pages/ui-features/dialog-content/dialog-content.component';
@Component({
  selector: 'app-deleted-units',
  templateUrl: './deleted-units.component.html',
  styleUrls: ['./deleted-units.component.scss'],
})
export class DeletedUnitsComponent implements OnInit {
  constructor(
    private service: UnitsService,
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
    this.getAllTaxes();
  }

  getAllTaxes(event?) {
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      offset: eve * 10,
      limit: this.limit,
      status: 2,
      userId: '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.unitsList(list).subscribe(
      (res: any) => {
        console.log('assets/4', res);
        this.totRecords = res.total_count;
        this.userActive = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTaxes(status) {
    const titles = status === 1 ? 'Active' : 'Suspend';
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

  usersDelete(status) {
    const list = {
      status: 1,
      ids: this.statusId,
    };
    // console.log(list)
    this.service.deleteUnitsList(list).subscribe(
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

  searchVerifiedActive(event, value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      offset: eve * 10,
      limit: this.limit,
      status: 2,
      userId: '',
      q: value,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.unitsListsearch(list, event).subscribe(
      (res: any) => {
        console.log('userActiveData search UNITS active **********', res);
        this.totRecords = res.total_count;
        this.userActiveData = res.data;
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  reportCheckbox(event, id) {
    console.log(event, id);
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
    // this.dialogService
    //   .open(UserUnitsDialogComponent, {
    //     context: {
    //       action: false,
    //       title: 'User Details',
    //       content: data,
    //       ok: 'Submit',
    //       cancelT: 'Cancel',
    //     },
    //   })
    //   .onClose.subscribe(res => {
    //     console.log(res)
    //     //  if(res){
    //     //    this.listTable.emit(1);
    //     //    this.statusId = [];
    //     //    this.userActive=[];
    //     //  }
    //   })
  }
}
