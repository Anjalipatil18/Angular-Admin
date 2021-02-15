import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PromotorsService } from '../service/promotors.service';
import { UserpromotorsDialogComponent } from '../inner-page/userpromotors-dialog/userpromotors-dialog.component';
@Component({
  selector: 'app-deleted-promotors',
  templateUrl: './deleted-promotors.component.html',
  styleUrls: ['./deleted-promotors.component.scss'],
})
export class DeletedPromotorsComponent implements OnInit {
  constructor(
    private service: PromotorsService,
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
    this.getAllPromotors();
  }

  getAllPromotors(event?) {
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      set: eve * 10,
      limit: this.limit,
      status: 4,
      statusText: 'deleted',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.promotorsList(list).subscribe(
      (res: any) => {
        this.totRecords = res.data ? res.data.length : 0;
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
      .open(UserpromotorsDialogComponent, {
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
