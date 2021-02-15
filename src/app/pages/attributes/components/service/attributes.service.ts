import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url, devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get active users GET /asset/{statusCode}/{assetId}
  modelsList(data, filter?, searchedKey?): Observable<any> {
    console.log('data', data);
    console.log('0000-------- models api');
    const url = `${devUrl}cities?skip=` + data.set + '&limit=' + data.limit;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    let Urls;
    data.id
      ? (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&status=' +
          data.status +
          '&id=' +
          data.id)
      : (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&status=' +
          data.status);
    return this.http.get(`${Urls}`);
  }

  attributesListEdit(id) {
    return this.http.get(`${Url}attributes/?attributeId=` + id);
  }

  attributesList(data) {
    return this.http.get(
      `${Url}attributes/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status +
        '&searchedKey=' +
        data.searchedKey
    );
  }

  deleteAttributes(data) {
    return this.http.patch(`${Url}deleteAttributes/`, data);
  }

  addAtrribute(data, id) {
    if (id !== '1') {
      data.id = id;
      console.log(data);
      return this.http.patch(`${Url}updateAttributes/`, data);
    } else {
      return this.http.post(`${Url}addAttributes/`, data);
    }
  }

  // get units list
  getUnitsList(list): Observable<any> {
    const params = new HttpParams()
      .set('offset', list.offset)
      .set('limit', list.limit);
    return this.http.get(`${devUrl}units?${params}`);
  }

  // get brands list
  // getBrandsList(): Observable<any>{
  //     return this.http.get(`${devUrl}brandsAndModels`);
  // }

  // get brands list
  getBrandsList(data, filter?): Observable<any> {
    const url = `${devUrl}cities?skip=` + data.set + '&limit=' + data.limit;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    let Urls;
    data.id
      ? (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&status=' +
          data.status +
          '&id=' +
          data.id)
      : (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&status=' +
          data.status);
    return this.http.get(`${Urls}`);
  }
}
