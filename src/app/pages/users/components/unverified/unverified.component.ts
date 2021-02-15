import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { UsersService } from '../service/users.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UserdetailsDialogComponent } from './../inner-pages/userdetails-dialog/userdetails-dialog.component';

@Component({
  selector: 'app-users-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
})
export class UnverifiedComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    allDataList && allDataList.data === 1
      ? this.getAllUsers(1)
      : this.getAllUsers(0);
  }

  userActiveData: any = [];
  userActive: any;
  userActiveSearch: any;
  columns: any;
  statusId: any = [];

  constructor(
    private service: UsersService,
    private dialogService: NbDialogService
  ) {}
  @ViewChild('userSearch', { static: true }) userSearchInput: ElementRef;
  ngOnInit() {
    fromEvent(this.userSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        if (text.length) {
          this.getAllUsers(1, text);
        } else {
          this.getAllUsers(1);
        }
      });
    this.getAllUsers(1);
  }

  getAllUsers(e?, searchKey?, userType?) {
    if (e === 1) {
      const list = {
        set: 0,
        limit: 10,
        status: 0,
        searchedKey: searchKey ? searchKey : '',
        userType: userType ? userType : '',
      };
      this.service.usersList(list).subscribe(
        (res: any) => {
          console.log('users/unverified/0', res);
          this.userActive = res.result;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.firstName &&
          data.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1
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

  openDialog(data, action) {
    const titles = data === '1' ? 'Active' : 'Delete';
    const reasonList = {
      deleteStatus: data,
      id: this.statusId,
    };
    if (data === 1) {
      this.service.usersStatusList(reasonList).subscribe(
        (res: any) => {
          console.log('deleteUser/' + data, res);
          this.emitList();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.dialogService
        .open(UserdetailsDialogComponent, {
          context: {
            action,
            title: titles,
            content: action ? reasonList : data,
            ok: 'Submit',
            cancelT: 'Cancel',
          },
        })
        .onClose.subscribe(res => {
          console.log(res);
          if (res) {
            this.emitList();
          }
        });
    }
  }

  emitList() {
    this.statusId = [];
    this.userActive = [];
    this.listTable.emit(1);
  }
}
