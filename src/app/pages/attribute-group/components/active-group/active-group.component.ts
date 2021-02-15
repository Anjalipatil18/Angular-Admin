import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { AttributeGroupService } from '../service/attribute-group.service';

@Component({
  selector: 'app-active-group',
  templateUrl: './active-group.component.html',
  styleUrls: ['./active-group.component.scss'],
})
export class ActiveGroupComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    // console.log(allDataList);
    const val = allDataList && allDataList.data === 1 ? this.getAllUsers() : '';
  }

  userActiveData: any = [];
  userActive: any;
  columns: any;
  userActiveSearch: any;
  statusId = [];

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  constructor(
    private service: AttributeGroupService,
    private dialogService: NbDialogService
  ) {}
  @ViewChild('attributeSearchGroup', { static: true })
  attributeSearchGroup: ElementRef;
  ngOnInit() {
    fromEvent(this.attributeSearchGroup.nativeElement, 'keyup')
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
          // this.service.attributesList(text).subscribe(
          //   (res: any) => {
          //     this.totRecords = res.recordsTotal;
          //     this.userActive = res.data;
          //   },
          //   error => {
          //     this.userActive = [];
          //     console.log('eroor', error);
          //   }
          // );
        } else {
          this.getAllUsers();
        }
      });
    this.getAllUsers();
  }

  getAllUsers(event?, searchKey?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 1,
      searchedKey: searchKey ? searchKey : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.attributeGroupList(list).subscribe(
      (res: any) => {
        console.log('attributesGroup/1', res);
        this.totRecords = res.recordsTotal;
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
    if (value) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.title.en &&
          data.title.en.toUpperCase().indexOf(value.toUpperCase()) > -1
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
    console.log('this.statusId', this.statusId, this.statusId.length);
  }

  openDialog(data) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'Delete',
          content: 'Are you sure you want to delete it ?',
          ok: 'Yes, delete it !!',
          cancelT: 'No, cancel it !!',
        },
      })
      .onClose.subscribe(ress => {
        if (ress) {
          const list = {
            deleteStatus: data,
            id: this.statusId,
          };
          this.service.deleteAttributes(list).subscribe(
            (res: any) => {
              console.log('deleteAttributes', res);
              this.statusId = [];
              this.userActive = [];
              this.listTable.emit(1);
            },
            error => {
              console.log(error);
            }
          );
        }
      });
  }
}
