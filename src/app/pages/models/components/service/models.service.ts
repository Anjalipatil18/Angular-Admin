import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  modelsData: any;
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get country list
  getCountryList(): Observable<any> {
    return this.http.get(`${devUrl}countries`);
  }

  // get active users GET /asset/{statusCode}/{assetId}
  modelsList(data, filter?): Observable<any> {
    console.log('0000-------- models api');
    const url = `${devUrl}cities?skip=` + data.set + '&limit=' + data.limit;
    // const Urls = filter && filter.id == 1?url+'&trigger='+filter.trigger:filter && filter.id == 2?url+'&trigger='+filter.trigger+'&startDateTime='+filter.startDateTime+'&endDateTime='+filter.endDateTime:url+'&trigger='+1;
    let Urls;
    data.id && data.id !== 1
      ? (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&status=' +
          data.status +
          '&offset=' +
          data.set +
          '&brandId=' +
          data.id)
      : (Urls =
          `${devUrl}brandsAndModels?limit=` +
          data.limit +
          '&offset=' +
          data.set +
          '&status=' +
          data.status);
    return this.http.get(`${Urls}`);
  }

  // deleteTagList(data): Observable<any> {
  //   return this.http.patch(`${devUrl}cities`, data);
  // }

  deleteTagList(data, status): Observable<any> {
    console.log(data);
    if (status === 6) {
      return this.http.request('delete', `${devUrl}brandsAndModels`, {
        body: data,
      });
    } else {
      return this.http.put(`${devUrl}brandsAndModels`, data);
    }
  }

  modelsStatusUpdate(data): Observable<any> {
    console.log('change status data', data);
    return this.http.patch(`${devUrl}brandsAndModels/models`, data);
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

  assetPostList(data, assetId): Observable<any> {
    console.log('asset id', assetId, data);
    if (assetId === '1') {
      return this.http.post(`${devUrl}brandsAndModels`, data);
    } else {
      return this.http.patch(`${devUrl}brandsAndModels`, data);
    }
    // if(id==1){
    //   return this.http.post(`${devUrl}asset`, data);
    // }else{
    //   return this.http.put(`${devUrl}asset?assetId=`+id, data);
    // }
    // return this.http.post(`${devUrl}brandsAndModels`, data);
  }

  searchActiveBrands(data): Observable<any> {
    return this.http.get(
      `${devUrl}brandsAndModels?type=` +
        data.type +
        '&status=' +
        data.status +
        '&search=' +
        data.search
    );
  }

  modelsPostList(data, assetId): Observable<any> {
    console.log('models brand id', assetId, data);
    if (assetId === '1') {
      return this.http.post(`${devUrl}brandsAndModels/models`, data);
    } else {
      return this.http.patch(`${devUrl}brandsAndModels/models`, data);
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

  modelsLikesList(data) {
    return this.http.get(`${devUrl}like?type=` + data.type + '&id=' + data.id);
  }

  modelsCommentsList(data) {
    return this.http.get(
      `${devUrl}comment?type=` + data.type + '&id=' + data.id
    );
  }

  reportGetList(data): Observable<any> {
    return this.http.get(
      `${devUrl}report?statusCode=3&reportType=` + data.reportType
    );
  }

  setModelData(data) {
    this.modelsData = data;
  }
  getModelsData() {
    console.log('this.modelsData this.modelsData', this.modelsData);
    return this.modelsData;
  }
}
