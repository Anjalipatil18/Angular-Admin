import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emailUrl, devUrl } from 'src/app/global/global';
import { smsUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private http: HttpClient, private conf: Configuration) {}
  // get logs/smsLogs/{pageNo}/{size}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  smsLogsList(data): Observable<any> {
    return this.http.get(
      `${devUrl}smsLogs?pageNo` +
        data.page +
        '&size=' +
        data.limit +
        '&smsSearch=' +
        data.smsSearch
    );
  }
  // https://api.lopongo.com/v1/emailLogs?skip=0&limit=100&searchText=a
  emailLogsList(data): Observable<any> {
    return this.http.get(
      `${devUrl}emailLogs?skip=` +
        data.page +
        '&limit=' +
        data.limit +
        '&emailSearch=' +
        data.emailSearch
    );
  }
}
