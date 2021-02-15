import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ColorsService } from '../service/colors.service';
import { UsercolorsDialogComponent } from '../inner-page/usercolors-dialog/usercolors-dialog.component';
@Component({
  selector: 'app-deleted-colors',
  templateUrl: './deleted-colors.component.html',
  styleUrls: ['./deleted-colors.component.scss'],
})
export class DeletedColorsComponent implements OnInit {
  constructor(
    private service: ColorsService,
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
    this.getAllColors();
  }

  getAllColors(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 4,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.colorsList(list).subscribe(
      (res: any) => {
        console.log('assets/4', res);
        this.totRecords = res.data.length;
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

  openDialog(data) {
    this.dialogService
      .open(UsercolorsDialogComponent, {
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
