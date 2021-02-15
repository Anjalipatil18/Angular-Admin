import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';

@Injectable({
  providedIn: 'root',
})
export class AssetTypeService {
  constructor(private http: HttpClient) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  assetsTypeList(data, id?) {
    const title = id && data.action === 1 ? 'assetTypeId' : 'assetSubTypeId';
    const url =
      `${Url}assetTypes/?set=` +
      data.set +
      '&limit=' +
      data.limit +
      '&status=' +
      data.status +
      '&trigger=' +
      data.trigger;
    const assetsUrl = id ? url + '&' + title + '=' + id : url;
    return this.http.get(`${assetsUrl}`);
  }

  /**
   *
   *
   * @param  data for sending whole data to post or update
   * @param  typeId for checking which api we need to call
   * @returns post and update data
   */
  updateAssetType(data, typeId, id): Observable<any> {
    console.log(typeof data, typeof typeId, typeof id);
    if (typeId === '1') {
      const title = data.trigger === 2 ? 'assetTypeId' : 'assetSubTypeId';
      if (data.trigger !== 1) {
        data[title] = id;
      }
    } else {
      const title =
        data.trigger === 1
          ? 'assetTypeId'
          : data.trigger === 2
          ? 'assetSubTypeId'
          : 'assetSubSubTypeId';
      data[title] = typeId;
    }

    if (typeId === '1') {
      return this.http.post(`${Url}addAssetTypes/`, data);
    } else {
      return this.http.patch(`${Url}updateAssetTypes/`, data);
    }
  }

  editAssetTypeList(trigger, id) {
    console.log(typeof trigger, typeof id);
    const title =
      trigger === '1'
        ? 'assetTypeId'
        : trigger === '2'
        ? 'assetSubTypeId'
        : 'assetSubSubTypeId';
    return this.http.get(
      `${Url}assetTypesInfo/?trigger=` + trigger + '&' + title + '=' + id
    );
  }

  getDeleteAssetType(data) {
    return this.http.patch(`${Url}deleteAssetType/`, data);
  }

  attributeGroupList(data) {
    return this.http.get(
      `${Url}attributesGroup/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status
    );
  }

  // assetTypeChangeOrder
  getAssetTypeOrder(data) {
    return this.http.patch(`${Url}assetTypeChangeOrder/`, data);
  }

  getAssetTypeDragOrder(data) {
    return this.http.patch(
      `${Url}assetTypeAttributesGroupListChangeOrder/`,
      data
    );
  }

  addAttributeGroups(data) {
    return this.http.post(`${Url}assetTypesAddAttributeGroups/`, data);
  }

  deleteAttrList(data) {
    return this.http.patch(`${Url}deleteAssetTypeAttrList/`, data);
  }
}
