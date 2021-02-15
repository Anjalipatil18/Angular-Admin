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

@Component({
  selector: 'app-deactivated-tags',
  templateUrl: './deactivated-tags.component.html',
  styleUrls: ['./deactivated-tags.component.scss'],
})
export class DeactivatedTagsComponent implements OnInit {
  constructor(private service: TagsService) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 0,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.tagsList(list).subscribe(
      (res: any) => {
        console.log('assets/0', res);
        // this.totRecords = res.data.length;
        // this.userActive = res.result;

        this.totRecords = res.recordsTotal;
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
}
