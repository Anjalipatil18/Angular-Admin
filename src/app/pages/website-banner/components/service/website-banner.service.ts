import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class WebsiteBannerService {
  constructor(private http: HttpClient, private conf: Configuration) {}
  // for search api cities page
  searchList(data): Observable<any> {
    const search = data;
    return this.http.get(`${devUrl}cities?name=` + search);
  }

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get country list
  getCountryList(): Observable<any> {
    return this.http.get(`${devUrl}countries`);
  }

  tagsList(data): Observable<any> {
    return this.http.get(
      `${UrlLink}assets/?status=${data.status}` + '&userId=' + data.userId
    );
  }

  getusers(data): Observable<any> {
    return this.http.get(`${devUrl}users/search?trigger=` + data.trigger);
  }

  // get active users GET /asset/{statusCode}/{assetId}
  bannerList(data, filter?): Observable<any> {
    const url = `${devUrl}banners/?limit=` + data.limit + '&skip=' + data.set;

    return this.http.get(`${url}`);
  }

  bannerListSearch(data, filter?): Observable<any> {
    const url =
      `${devUrl}banners/?limit=` +
      data.limit +
      '&skip=' +
      data.set +
      '&q=' +
      data.q;

    return this.http.get(`${url}`);
  }

  getEditBanner(data, filter?): Observable<any> {
    const url =
      `${devUrl}banners/?limit=` +
      data.limit +
      '&skip=' +
      data.set +
      '&bannerId=' +
      data.bannerid;

    return this.http.get(`${url}`);
  }

  // deleteTagList(data): Observable<any> {
  //   return this.http.patch(`${devUrl}asset`, data);
  // }

  deleteTagList(data): Observable<any> {
    // return this.http.delete(`${devUrl}banners/`, data)
    return this.http.request('delete', `${devUrl}banners/`, { body: data });
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

  postBanner(data): Observable<any> {
    return this.http.post(`${devUrl}banners/`, data);
  }

  patchBanner(data): Observable<any> {
    return this.http.patch(`${devUrl}banners/`, data);
  }

  assetPostList(data): Observable<any> {
    // if(id==1){
    //   return this.http.post(`${devUrl}asset`, data);
    // }else{
    //   return this.http.put(`${devUrl}asset?assetId=`+id, data);
    // }
    return this.http.post(`${devUrl}cities`, data);
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

  taxesList(data, filter?): Observable<any> {
    const url = `${devUrl}taxes?status=${data.status}&limit=` + data.limit;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    return this.http.get(`${url}`);
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
