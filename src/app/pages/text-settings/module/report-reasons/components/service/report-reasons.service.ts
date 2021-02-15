import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class ReportReasonsService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  reportReasons(type, id?): Observable<any> {
    const url = id
      ? `${Url}reportReasons/?userType=` + type + `&reportReasonId=` + id
      : `${Url}reportReasons/?userType=` + type;
    return this.http.get(`${url}`);
  }

  reportUpdateReasons(data, type): Observable<any> {
    if (type === '1') {
      return this.http.post(`${Url}addReportReasons/`, data);
    } else {
      return this.http.patch(`${Url}updateReportReasons/`, data);
    }
  }

  deleteReport(data) {
    return this.http.patch(`${Url}reportReasonsAction/`, data);
  }
}
