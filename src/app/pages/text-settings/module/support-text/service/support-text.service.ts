import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class SupportTextService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  supportTextUserList(type, id?): Observable<any> {
    const url = id
      ? `${Url}supportText/?userType=` + type + `&supportTextId=` + id
      : `${Url}supportText/?userType=` + type;
    return this.http.get(`${url}`);
  }

  addSupportUserList(data, id): Observable<any> {
    if (id) {
      return this.http.patch(`${Url}updateSupportText/`, data);
    } else {
      return this.http.post(`${Url}addSupportText/`, data);
    }
  }

  deleteSupportTextAction(data) {
    return this.http.patch(`${Url}supportTextAction/`, data);
  }
}
