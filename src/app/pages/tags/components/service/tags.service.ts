import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get active users GET /asset/{statusCode}/{assetId}
  tagsList(data, filter?, q?): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders();
    const Oheaders = headers.set('platform', '3');
    if (data.sort) {
      const params = new HttpParams()
        .set('page', data.set + 1)
        .set('status', data.status)
        .set('sort', data.sort);
      return this.http.get(`${UrlLink}assets/?${params}`, {
        headers: Oheaders,
      });
    } else if (data.q) {
      const params = new HttpParams()
        .set('page', data.set + 1)
        .set('status', data.status)
        .set('q', data.q);
      return this.http.get(`${UrlLink}assets/?${params}`, {
        headers: Oheaders,
      });
    } else {
      console.log(data);
      const params = new HttpParams()
        .set('page', data.set + 1)
        .set('status', data.status);
      return this.http.get(`${UrlLink}assets/?${params}`, {
        headers: Oheaders,
      });
    }
    // const url =
    //   `${UrlLink}assets?status=${data.status}&skip=` +
    //   data.set +
    //   '&limit=' +
    //   data.limit;
    // const Urls =
    //   filter && filter.id === 1
    //     ? url + '&trigger=' + filter.trigger
    //     : filter && filter.id === 2
    //     ? url +
    //       '&trigger=' +
    //       filter.trigger +
    //       '&startDateTime=' +
    //       filter.startDateTime +
    //       '&endDateTime=' +
    //       filter.endDateTime
    //     : url + '&trigger=' + 1;
    // return this.http.get(`${Urls}`);
  }

  deleteActiveComments(data): Observable<any> {
    return this.http.request('patch', `${devUrl}comments/`, { body: data });
  }

  deleteTagList(data): Observable<any> {
    // return this.http.delete(`${UrlLink}assets/`, data);
    return this.http.request('delete', `${UrlLink}assets/`, { body: data });
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}assetType?statusCode=1`);
  }

  assetSubList(data): Observable<any> {
    return this.http.get(
      `${devUrl}assetSubtype?assetTypeId=` + data.assetSubtype
    );
  }
  getModel(data): Observable<any> {
    return this.http.get(`${devUrl}models?brandName=` + data);
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
    console.log(data, id);
    if (id === '1') {
      // return this.http.post(`${Url}assewts`, data)
      return this.http.post(`${UrlLink}assets/`, data);
    } else {
      data._id = id;
      // let params = new HttpParams()
      // .set('_id', id).set('data');
      return this.http.patch(`${UrlLink}assets/`, data);
    }
  }

  assetGetList(data): Observable<any> {
    console.log('asdadasadsa');
    return this.http.get(`${UrlLink}assetDetails/?assetId=` + data.assetId);
  }

  userGetList(data): Observable<any> {
    const params = new HttpParams().set('trigger', data.trigger);
    return this.http.get(`${devUrl}users/search`, { params });
  }

  // get taxes api
  taxesGetList(data): Observable<any> {
    return this.http.get(`${devUrl}taxes?status=` + data.status);
  }

  // get currency list
  getCurrencyList(): Observable<any> {
    return this.http.get(`${devUrl}currencies`);
  }

  // get units list
  getUnitsList(): Observable<any> {
    return this.http.get(`${devUrl}units`);
  }

  tagsLikesList(data) {
    return this.http.get(
      `${devUrl}likesDislikeAsset/?type=` + data.type + '&assetId=' + data.id
    );
  }

  tagsCommentsList(data) {
    console.log(data);
    return this.http.get(
      `${devUrl}comments/?assetId=` +
        data.id +
        '&status=' +
        data.status +
        '&skip=' +
        data.skip +
        '&limit=' +
        data.limit
    );
  }

  reportGetList(data): Observable<any> {
    return this.http.get(
      `${devUrl}report?statusCode=3&reportType=` + data.reportType
    );
  }
}
