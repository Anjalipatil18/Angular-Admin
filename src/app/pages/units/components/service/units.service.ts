import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get active taxes GET /asset/{statusCode}/{assetId}
  unitsList(data, filter?): Observable<any> {
    const url =
      `${UrlLink}units/?status=${data.status}&skip=` +
      data.offset +
      '&limit=' +
      data.limit +
      '&unitId=' +
      data.userId;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    return this.http.get(`${url}`);
  }

  unitsListsearch(data, filter?): Observable<any> {
    const url =
      `${UrlLink}units/?status=${data.status}&skip=` +
      data.offset +
      '&limit=' +
      data.limit +
      '&q=' +
      data.q;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    return this.http.get(`${url}`);
  }

  deleteUnitsList(data): Observable<any> {
    return this.http.patch(`${UrlLink}units/`, data);
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}assetType?statusCode=1`);
  }

  assetSubList(data): Observable<any> {
    return this.http.get(
      `${devUrl}assetSubtype?assetTypeId=` + data.assetSubtype
    );
  }

  // assetSubSubList(data): Observable<any> {
  //   const params = new HttpParams()
  //   .set('assetSubTypeId', data.assetSubSubtype)
  //   return this.http.get(
  //     `${devUrl}assetSubSubtype`
  //   , { params })
  // }

  atrributeGroupList(data): Observable<any> {
    return this.http.post(`${devUrl}attributesGroups`, data);
  }

  unitsPostList(data, id): Observable<any> {
    return this.http.post(`${UrlLink}units/`, data);
  }

  unitsPatchList(data): Observable<any> {
    return this.http.patch(`${UrlLink}units/`, data);
  }

  assetGetList(data): Observable<any> {
    return this.http.get(
      `${devUrl}asset?assetId=` +
        data.assetId +
        '&statusCode=' +
        data.statusCode
    );
  }

  userGetList(data): Observable<any> {
    return this.http.get(`${devUrl}users/search`);
  }

  // get currency list
  getCountriesList(): Observable<any> {
    return this.http.get(`${devUrl}cities`);
  }

  // get units list
  getUnitsList(): Observable<any> {
    return this.http.get(`${devUrl}units`);
  }

  taxesLikesList(data) {
    return this.http.get(`${devUrl}like?type=` + data.type + '&id=' + data.id);
  }

  taxesCommentsList(data) {
    return this.http.get(
      `${devUrl}comment?type=` + data.type + '&id=' + data.id
    );
  }

  reportGetList(data): Observable<any> {
    return this.http.get(
      `${devUrl}report?statusCode=3&reportType=` + data.reportType
    );
  }
}
