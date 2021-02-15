import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PromotorsService } from '../service/promotors.service';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UserpromotorsDialogComponent } from '../inner-page/userpromotors-dialog/userpromotors-dialog.component';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-deactivated-promotors',
  templateUrl: './deactivated-promotors.component.html',
  styleUrls: ['./deactivated-promotors.component.scss'],
})
export class DeactivatedPromotorsComponent implements OnInit {
  constructor(
    private service: PromotorsService,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  @ViewChild('deniedPromoters', { static: true }) promotersInput: ElementRef;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  ngOnInit() {
    fromEvent(this.promotersInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then 2
        // ,filter(res => res.length > 2)
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        // console.log(text);
        // const temp = text.length ? text :  this.getAllRating();
        if (text.length) {
          const list = {
            search: text,
            type: 'rejected',
          };
          this.service.searchList(list).subscribe(
            (res: any) => {
              console.log('countries1111111111---------->', res);
              this.totRecords = res.data ? res.data.length : 0;
              this.userActive = res.data;
              // this.userActive.map((data, index) => {
              //   data.username == '' ? this.userActive[index].username = 'admin' : this.userActive[index].username;
              // })
            },
            error => {
              this.userActive = [];
              console.log('eroor', error);
            }
          );
        } else {
          this.getAllPromotors();
        }
      });
    this.getAllPromotors();
  }

  getAllPromotors(event?) {
    const eve = event && event.page ? event.page - 1 : 0;
    const list = {
      set: eve * 10,
      limit: this.limit,
      status: 0,
      statusText: 'rejected',
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

  //  active and delete promoters
  activePromotors(status) {
    const titles = status === 2 ? 'Delete' : 'Suspend';
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
    const statusCode = status === 2 ? 'deleted' : 'suspended';
    const list = {
      userIds: this.statusId,
      // pin: '12345',
      promoter: statusCode,
      reason: res,
    };
    this.service.deleteTagList(list).subscribe(
      () => {
        this.statusId = [];
        this.userActive = [];
        this.getAllPromotors();
      },
      error => {
        console.log(error);
      }
    );
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
