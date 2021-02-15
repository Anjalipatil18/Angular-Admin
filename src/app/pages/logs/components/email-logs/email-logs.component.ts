import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { LogsService } from '../../components/service/log.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
@Component({
  selector: 'app-email-logs',
  templateUrl: './email-logs.component.html',
  styleUrls: ['./email-logs.component.scss'],
})
export class EmailLogsComponent implements OnInit {
  constructor(
    private service: LogsService,
    private spinner: NgxSpinnerService
  ) {}

  emailLogsData: any = [];
  columns: any;
  emailLogs: any;
  totRecords: any;

  emailLogsSearch: any;
  @ViewChild('emailSearch', { static: true }) emailSearchInput: ElementRef;
  ngOnInit() {
    fromEvent(this.emailSearchInput.nativeElement, 'keyup')
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
          this.getAllemailLogs(text);
        } else {
          this.getAllemailLogs();
        }
      });
    this.getAllemailLogs();
  }

  // get email language
  getAllemailLogs(searchKey?) {
    const list = {
      page: 1,
      limit: 10,
      emailSearch: searchKey ? searchKey : '',
    };
    this.service.emailLogsList(list).subscribe(
      (res: any) => {
        console.log('getEmailLogs', res);
        this.emailLogs = res.data;
        this.totRecords = res.recordsTotal;
      },
      error => {
        console.log(error);
      }
    );
  }
  searchemailLogsActive(value) {
    this.emailLogsSearch = [];
    this.emailLogsData = [];
    if (value) {
      this.emailLogsData = this.emailLogs;
      this.emailLogsData.map(data => {
        if (data.username.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.emailLogsSearch.push(data);
        }
      });
      this.emailLogsData = this.emailLogsSearch;
    } else {
      console.log('else');
    }
  }
}
