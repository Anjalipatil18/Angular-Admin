import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class PromotionPlanService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  // get active users GET /asset/{statusCode}/{assetId} id
  purchasePlanList(data): Observable<any> {
    console.log('----purchasePlanList----', data);
    if (data.userId === '' && data.searchedKey === '') {
      return this.http.get(`${devUrl}promotionPlan?status=${data.status}`);
    } else if (data.searchedKey !== '' && data.userId === '') {
      return this.http.get(
        `${devUrl}promotionPlan?status=${data.status}` +
          '&search=' +
          data.searchedKey
      );
    }
  }

  purchasePlanEdit(data): Observable<any> {
    console.log('----purchasePlanList----', data);
    return this.http.get(
      `${devUrl}promotionPlan?status=${data.status}` + '&id=' + data.userId
    );
  }

  purchaseSearchPlanList(data, filter?, q?): Observable<any> {
    return this.http.get(
      `${devUrl}promotionPlan?status=${data.status}` + '&search=' + data.search
    );
  }

  addPostPromotion(data): Observable<any> {
    return this.http.post(`${devUrl}promotionPlan`, data);
  }

  addPatchPromotion(data): Observable<any> {
    return this.http.patch(`${devUrl}promotionPlan`, data);
  }

  deleteTagList(data): Observable<any> {
    return this.http.patch(`${UrlLink}assets/`, data);
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}assetType?statusCode=1`);
  }

  getPurchaseLogs(data): Observable<any> {
    return this.http.get(
      `${devUrl}promoteAds?planId=` +
        data.id +
        '&offset=' +
        data.set +
        '&limit=' +
        data.limit
    );
    // return this.http.get(`${devUrl}promoteAds/active?assetId=`+ data.id);
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
    if (id === '1') {
      // return this.http.post(`${Url}assewts`, data)
      return this.http.post(`${UrlLink}assets/`, data);
    } else {
      return this.http.put(`${devUrl}asset?assetId=` + id, data);
    }
  }

  deletePromotionPlan(data): Observable<any> {
    return this.http.patch(`${devUrl}promotionPlanStatus`, data);
  }

  permanentdeletePromotionPlan(data): Observable<any> {
    return this.http.delete(
      `${devUrl}promotionPlan?promotionPlanId=` + data.promotionPlanId
    );
  }

  assetGetList(data): Observable<any> {
    return this.http.get(`${UrlLink}assetDetails/?assetId=` + data.assetId);
  }

  userGetList(data): Observable<any> {
    return this.http.get(`${devUrl}users/search`);
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
    return this.http.get(`${devUrl}like?type=` + data.type + '&id=' + data.id);
  }

  tagsCommentsList(data) {
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
