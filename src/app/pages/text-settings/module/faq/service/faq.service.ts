import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  getFaqList(): Observable<any> {
    return this.http.get(`${devUrl}faq`);
  }

  getfaqEditData(data): Observable<any> {
    return this.http.get(`${devUrl}faq?parentId=` + data.id);
  }

  getfaqEdit(data): Observable<any> {
    return this.http.get(`${devUrl}faq?id=` + data.id);
  }

  deleteFaqList(data): Observable<any> {
    return this.http.request('delete', `${devUrl}faq`, { body: data });
  }

  addFaqlist(data, subid): Observable<any> {
    if (subid === '1') {
      return this.http.post(`${devUrl}faq`, data);
    } else {
      const id = 'parentId';
      data[id] = subid;
      return this.http.post(`${devUrl}faq`, data);
    }
  }

  patchFaqlist(data, parentid): Observable<any> {
    if (parentid) {
      const id = 'parentId';
      data[id] = parentid;
      return this.http.patch(`${devUrl}faq`, data);
    } else {
      return this.http.patch(`${devUrl}faq`, data);
    }
  }

  deleteSupportTextAction(data) {
    return this.http.patch(`${Url}supportTextAction/`, data);
  }
}
