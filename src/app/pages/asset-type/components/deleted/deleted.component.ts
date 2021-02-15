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
import { AssetTypeService } from '../service/asset-type.service';

@Component({
  selector: 'app-type-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss'],
})
export class DeletedComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    const val = allDataList && allDataList.data === 3 ? this.getAllUsers() : '';
  }

  constructor(
    private service: AssetTypeService,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActive: any;
  columns: any;
  userActiveSearch: any;
  statusId = [];

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
      status: 2,
      trigger: 1,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.assetsTypeList(list).subscribe(
      (res: any) => {
        console.log('assetsType/2', res);
        this.totRecords = res.result.length;
        this.userActive = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  usersDelete(status) {
    // this.roles.splice(index, 1);
    // this.roles = [...this.roles];
    const list = {
      deleteStatus: status,
      id: this.statusId,
      trigger: 1,
    };
    console.log(list);
    this.service.getDeleteAssetType(list).subscribe(
      (res: any) => {
        this.userActive = [];
        this.getAllUsers();
        console.log('DeleteAssetType', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteType(status) {
    const titles = status === 1 ? 'Activate' : 'Delete';
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
}
