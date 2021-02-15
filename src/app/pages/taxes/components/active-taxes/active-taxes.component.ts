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
import { UsertaxesDialogComponent } from '../inner-page/usertaxes-dialog/usertaxes-dialog.component';

import { TaxesService } from '../service/taxes.service';
import { AssetTypeService } from './../../../asset-type/components/service/asset-type.service';

@Component({
  selector: 'app-active-taxes',
  templateUrl: './active-taxes.component.html',
  styleUrls: ['./active-taxes.component.scss'],
})
export class ActiveTaxesComponent implements OnInit {
  constructor(
    private service: TaxesService,
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
    //  {title:'AssetType', id:"6"},
    //  {title:'assetSubType (assetSubtypeId)', id:"7"},
    //  {title:'assetSubSubType (assetSubSubtypeId)', id:"8"},
    //  {title:'LISTED ON MARKETPLACE (marketPlaceStatusCode)', id:"9"},
    //  {title:'PRIVATE TAG (marketPlaceStatusCode)', id:"10"},
    //  {title:'BOTH  (marketPlaceStatusCode)', id:"11"},
  ];

  ngOnInit() {
    this.getAllTaxes();
  }

  getAllTaxes(event?) {
    const list = {
      offset: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'Active',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.taxesList(list, event).subscribe(
      (res: any) => {
        console.log('taxes active **********', res);
        this.totRecords = res.data.length;
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

  usersDelete(status) {
    const list = {
      status,
      ids: this.statusId,
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

  deleteTaxes(status) {
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
          this.usersDelete(titles);
        }
      });
  }

  openDialog(data) {
    this.dialogService
      .open(UsertaxesDialogComponent, {
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
      this.getAllTaxes(list);
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
      this.getAllTaxes(list);
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
