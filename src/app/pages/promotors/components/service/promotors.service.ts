import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class PromotorsService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  promotorsList(data, filter?): Observable<any> {
    const Urls =
      `${devUrl}promoter` +
      `?isPromoter=` +
      data.statusText +
      '&limit=' +
      data.limit +
      '&offset=' +
      data.set;
    return this.http.get(`${Urls}`);
  }
  // for search api
  searchList(data): Observable<any> {
    return this.http.get(
      `${devUrl}promoter/search?search=` +
        data.search +
        `&promoterStatus=` +
        data.type
    );
  }
  sharedProductLogs(id): Observable<any> {
    const Urls = `${devUrl}sharedProductLogs` + `?userId=` + id;
    return this.http.get(`${Urls}`);
  }

  deleteTagList(data): Observable<any> {
    return this.http.put(`${devUrl}promoter`, data);
  }
  // approve the promoter
  approveTagList(data): Observable<any> {
    return this.http.patch(`${devUrl}promoter`, data);
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}promoter`);
  }

  assetSubList(data): Observable<any> {
    return this.http.get(
      `${devUrl}assetSubtype?assetTypeId=` + data.assetSubtype
    );
  }

  assetSubSubList(data): Observable<any> {
    return this.http.get(
      `${devUrl}assetSubSubtype?assetSubTypeId=` + data.assetSubSubtype
    );
  }

  atrributeGroupList(data): Observable<any> {
    return this.http.post(`${devUrl}attributesGroups`, data);
  }

  assetPostList(data, id): Observable<any> {
    if (id === 1) {
      return this.http.post(`${devUrl}asset`, data);
    } else {
      return this.http.put(`${devUrl}asset/` + id, data);
    }
  }

  assetGetList(data): Observable<any> {
    return this.http.get(
      `${devUrl}asset?statusCode=` +
        data.statusCode +
        '&assetId=' +
        data.assetId
    );
  }

  userGetList(data): Observable<any> {
    const params = new HttpParams().set('trigger', data.trigger);
    return this.http.get(`${devUrl}users/search`, { params });
  }

  // get currency list
  getCurrencyList(): Observable<any> {
    return this.http.get(`${devUrl}currencies`);
  }

  promotorsLikesList(data) {
    return this.http.post(`${devUrl}referrals`, data);
  }

  promotorsCommentsList(data) {
    return this.http.get(
      `${devUrl}comment?type=` + data.type + '&id=' + data.id
    );
  }

  reportGetList(data): Observable<any> {
    return this.http.get(`${devUrl}promoter?isPromoter=` + 'approved');
  }

  // new user
  // email validate
  getemailValidation(data) {
    return this.http.post(`${devUrl}validateEmail`, data);
  }
  // username validate
  postUserValidation(data) {
    return this.http.post(`${devUrl}userName?username=` + data, '');
  }
  // get all country list
  countryList(data): Observable<any> {
    const url = `${devUrl}countries`;
    return this.http.get(`${url}`);
  }
  // post new promotor signup
  postPromotor(data) {
    console.log('post data api', data);
    return this.http.post(`${devUrl}signUp`, data);
  }
  // post promotor data
  postPromotorList(data, id): Observable<any> {
    return this.http.post(`${devUrl}promoter`, data);
  }
}
