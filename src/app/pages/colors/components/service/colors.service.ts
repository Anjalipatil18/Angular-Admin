import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // for search api colors page
  colorsSearch(data): Observable<any> {
    const search = data;
    return this.http.get(`${devUrl}colors?name=` + search);
  }
  // get colors
  colorsList(data, filter?): Observable<any> {
    // const url = `${devUrl}asset?statusCode=${data.status}&skip=`+data.set+'&limit='+data.limit;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    // return this.http.get(`${Urls}`);

    const Urls =
      `${devUrl}colors?offset=` +
      data.offset +
      '&limit=' +
      data.limit +
      '&name=' +
      data.name;
    let url;
    if (data.r && data.name && data.type) {
      url =
        `${Urls}` +
        '&type=' +
        data.type +
        '&name=' +
        data.name +
        '&r=' +
        data.r +
        '&g=' +
        data.g +
        '&b=' +
        data.b;
    } else if (data.type && data.name) {
      url = `${Urls}` + '&type=' + data.type + '&name=' + data.name;
    } else {
      url = Urls;
    }
    // const url = `${devUrl}colors?offset=`+data.offset+'&limit='+data.limit;
    console.log('get colors api func', url, data);
    return this.http.get(`${url}`);
  }

  deleteColorsList(data): Observable<any> {
    console.log('colors delete api called');
    return this.http.patch(`${devUrl}colors`, data);
  }

  // add colors
  addColorsList(data): Observable<any> {
    return this.http.post(`${devUrl}colors`, data);
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

  colorsLikesList(data) {
    return this.http.get(`${devUrl}like?type=` + data.type + '&id=' + data.id);
  }

  colorsCommentsList(data) {
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
