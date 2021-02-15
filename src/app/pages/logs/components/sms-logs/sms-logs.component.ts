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
import { LogsService } from '../../components/service/log.service';

@Component({
  selector: 'app-sms-logs',
  templateUrl: './sms-logs.component.html',
  styleUrls: ['./sms-logs.component.scss'],
})
export class SmsLogsComponent implements OnInit {
  constructor(private service: LogsService) {}

  smsLogsData: any = [];
  columns: any;
  smsLogs: any;

  smsLogsSearch: any;
  @ViewChild('emailSearch', { static: true }) smsSearchInput: ElementRef;
  ngOnInit() {
    fromEvent(this.smsSearchInput.nativeElement, 'keyup')
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
          this.getAllSmsLogs(text);
        } else {
          this.getAllSmsLogs();
        }
      });
    this.getAllSmsLogs();
  }

  // get enabled language
  getAllSmsLogs(smsSearch?) {
    const list = {
      page: 1,
      limit: 10,
      smsSearch: smsSearch ? smsSearch : '',
    };
    this.service.smsLogsList(list).subscribe(
      (res: any) => {
        console.log('smsLogs', res);
        this.smsLogs = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  searchsmsLogsActive(value) {
    const searchText = isNaN(value);
    this.smsLogsSearch = [];
    this.smsLogsData = [];
    if (value) {
      this.smsLogsData = this.smsLogs;
      this.smsLogsData.map(data => {
        const key = searchText ? data.username : data.phoneNumber;
        if (key.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.smsLogsSearch.push(data);
        }
      });
      this.smsLogsData = this.smsLogsSearch;
    } else {
      console.log('else');
    }
  }
}
