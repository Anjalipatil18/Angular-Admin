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
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { UserdetailsDialogComponent } from './../inner-pages/userdetails-dialog/userdetails-dialog.component';
import { UsersService } from '../service/users.service';
import { faTabletAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-active-verified',
  templateUrl: './active-verified.component.html',
  styleUrls: ['./active-verified.component.scss'],
})
export class ActiveVerifiedComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    const val = allDataList && allDataList.data === 1 ? this.getAllUsers() : '';
  }

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];
  faMobileAlt = faMobileAlt;

  constructor(
    private service: UsersService,
    private dialogService: NbDialogService
  ) {}

  limit = 10;
  totRecords: any;
  paginationIndex = 0;
  listFilter = [
    { title: 'Users', id: '1' },
    { title: 'Promoters ', id: '2' },
    { title: 'Sellers', id: '3' },
    { title: 'Promoters & Sellers', id: '4' },
    // { title: 'Date Range Picker', id: '5' },
    //  {title:'AssetType', id:"6"},
    //  {title:'assetSubType (assetSubtypeId)', id:"7"},
    //  {title:'assetSubSubType (assetSubSubtypeId)', id:"8"},
    //  {title:'LISTED ON MARKETPLACE (marketPlaceStatusCode)', id:"9"},
    //  {title:'PRIVATE TAG (marketPlaceStatusCode)', id:"10"},
    //  {title:'BOTH  (marketPlaceStatusCode)', id:"11"},
  ];
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
        console.log(text);
        if (text.length) {
          this.getAllUsers('', text);
        } else {
          this.getAllUsers();
        }
      });
    this.getAllUsers();
  }

  getAllUsers(event?, searchKey?, userType?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 1,
      searchedKey: searchKey ? searchKey : '',
      userType: userType ? userType : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    // let list ={
    //   set:0,
    //   limit:10,
    //   status:1
    // }
    this.service.usersList(list).subscribe(
      (res: any) => {
        this.totRecords = res.recordsTotal;
        console.log('users/active/1', res);
        this.userActive = res.result;
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
    let titles;
    if (data === '2') {
      titles = 'Suspend';
    } else if (data === '6') {
      titles = 'User Details';
    } else {
      titles = 'Delete';
    }

    const reasonList = {
      deleteStatus: data,
      id: this.statusId,
    };
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
          this.listTable.emit(1);
          this.statusId = [];
          this.userActive = [];
        }
      });
  }

  filterPrice(userEvent) {
    console.log(userEvent);
    this.getAllUsers('', '', userEvent);
  }
}
