import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class SearchtagService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  searchTag(data): Observable<any> {
    console.log('----purchasePlanList----', data);
    if (data.search === '') {
      const url = `${devUrl}searchTag`;
      return this.http.get(`${url}`);
    } else if (data.searchedKey !== '') {
      return this.http.get(`${devUrl}searchTag?search=` + data.search);
    }
  }

  getEditSearchTagData(data): Observable<any> {
    console.log('----getEditSearchTagData----', data);
    return this.http.get(`${devUrl}searchTag?id=` + data.tagid);
  }

  deleteTagList(data): Observable<any> {
    // return this.http.delete(`${devUrl}banners/`, data)
    return this.http.request('delete', `${devUrl}searchTag`, { body: data });
  }

  searchTagsPostList(data): Observable<any> {
    return this.http.post(`${devUrl}searchTag`, data);
  }

  searchTagsPatch(data): Observable<any> {
    return this.http.patch(`${devUrl}searchTag`, data);
  }
}
