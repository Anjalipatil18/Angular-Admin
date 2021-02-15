import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { TagsService } from '../service/tags.service';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UsertagsDialogComponent } from '../inner-page/usertags-dialog/usertags-dialog.component';

@Component({
  selector: 'app-reported-tags',
  templateUrl: './reported-tags.component.html',
  styleUrls: ['./reported-tags.component.scss'],
})
export class ReportedTagsComponent implements OnInit {
  constructor(
    private service: TagsService,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  totRecords: any;

  paginationIndex = 0;

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags(event?) {
    const list = {
      reportType: 'asset',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.reportGetList(list).subscribe(
      (res: any) => {
        console.log('report/asset', res);
        this.totRecords = res.recordsTotal ? res.recordsTotal : res.data.length;
        this.userActive = res.data;
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

  usersDelete(status) {
    const list = {
      statusCode: status,
      assetId: this.statusId,
      byAdmin: 1,
    };
    // console.log(list)
    this.service.deleteTagList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllTags();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTags(status) {
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

  openDialog(data) {
    this.dialogService
      .open(UsertagsDialogComponent, {
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
}
