import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { AssetTypeService } from '../service/asset-type.service';

@Component({
  selector: 'app-type-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    const val = allDataList && allDataList.data === 2 ? this.getAllUsers() : '';
  }

  constructor(
    private service: AssetTypeService,
    private dialogService: NbDialogService
  ) {}

  userActive: any;
  columns: any;
  statusId = [];
  aciveGroupSearch: any = [];
  aciveGroupData: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 1,
      trigger: 1,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.assetsTypeList(list).subscribe(
      (res: any) => {
        console.log('assetsType/1', res);
        this.totRecords = res.result.length;
        res.result.sort((a, b) => a.seqId - b.seqId);
        this.userActive = res.result;
        this.aciveGroupData = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchGroupUser(value) {
    this.aciveGroupSearch = [];
    if (value && this.aciveGroupData && this.aciveGroupData.length > 0) {
      this.aciveGroupData.map(data => {
        if (data.titleLang.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.aciveGroupSearch.push(data);
        }
      });
      this.userActive = this.aciveGroupSearch;
    } else {
      this.userActive = this.aciveGroupData;
    }
  }

  usersDelete(status) {
    const list = {
      deleteStatus: status,
      id: this.statusId,
      trigger: 1,
    };
    console.log(list);
    this.service.getDeleteAssetType(list).subscribe(
      (res: any) => {
        this.listTable.emit(3);
        this.userActive = [];
        this.aciveGroupData = [];
        this.getAllUsers();
        console.log('DeleteAssetType', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   *
   *
   * @param  status  taking for what action we need to perdom
   * @description it is given the document is delete or active and inactive
   * @returns success Msg and return list
   */
  deleteType(status) {
    const titles = status === 0 ? 'In Active' : 'Delete';
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
        console.log(res);
        if (res) {
          this.usersDelete(status);
        }
      });
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
    // console.log(this.statusId);
  }

  reOrder(index, status) {
    console.log(index, status);
    const list = {
      up: {
        id:
          status === 0
            ? this.userActive[index].id
            : this.userActive[index + 1].id,
        seqId:
          status === 0
            ? this.userActive[index - 1].seqId
            : this.userActive[index].seqId,
      },
      down: {
        id:
          status === 1
            ? this.userActive[index].id
            : this.userActive[index - 1].id,
        seqId:
          status === 1
            ? this.userActive[index + 1].seqId
            : this.userActive[index].seqId,
      },
      trigger: 1,
    };
    console.log(list);
    this.service.getAssetTypeOrder(list).subscribe(
      (res: any) => {
        console.log('attributesGroupAttrChangeOrder/id', res);
        this.userActive = [];
        this.aciveGroupData = [];
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
  }
}
