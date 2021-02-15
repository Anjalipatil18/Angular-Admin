import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get active users GET /asset/{statusCode}/{assetId}
  ratingList(data, filter?): Observable<any> {
    const url =
      `${devUrl}asset?statusCode=${data.status}&skip=` +
      data.set +
      '&limit=' +
      data.limit;
    const Urls =
      filter && filter.id === 1
        ? url + '&trigger=' + filter.trigger
        : filter && filter.id === 2
        ? url +
          '&trigger=' +
          filter.trigger +
          '&startDateTime=' +
          filter.startDateTime +
          '&endDateTime=' +
          filter.endDateTime
        : url + '&trigger=' + 1;
    return this.http.get(`${Urls}`);
  }

  deleteTagList(data): Observable<any> {
    return this.http.patch(`${devUrl}asset`, data);
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}assetType?statusCode=1`);
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
      return this.http.put(`${devUrl}asset?assetId=` + id, data);
    }
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
  getCurrencyList(): Observable<any> {
    return this.http.get(`${devUrl}currencies`);
  }

  // get units list
  getUnitsList(): Observable<any> {
    return this.http.get(`${devUrl}units`);
  }

  ratingLikesList(data) {
    return this.http.get(`${devUrl}like?type=` + data.type + '&id=' + data.id);
  }

  ratingCommentsList(data) {
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
