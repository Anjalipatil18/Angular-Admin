import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient, private conf: Configuration) {}

  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }

  sellerList(data, filter?): Observable<any> {
    let Urls;
    data.userId
      ? (Urls =
          `${devUrl}seller` +
          `?userId=` +
          data.userId +
          `&statusText=` +
          data.statusText +
          `&offset=` +
          data.offset +
          `&limit=` +
          data.limit)
      : (Urls =
          `${devUrl}seller` +
          `?statusText=` +
          data.statusText +
          `&offset=` +
          data.offset +
          `&limit=` +
          data.limit);
    return this.http.get(`${Urls}`);
  }

  deleteSellerList(data): Observable<any> {
    return this.http.put(`${devUrl}seller`, data);
  }
  // approve the promoter
  approveTagList(data): Observable<any> {
    return this.http.patch(`${devUrl}promoter`, data);
  }

  assetList(): Observable<any> {
    return this.http.get(`${devUrl}promoter?isPromoter=` + 'approved');
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

  sellerPost(data): Observable<any> {
    return this.http.post(`${devUrl}seller`, data);
  }

  sellerPatch(data): Observable<any> {
    return this.http.patch(`${devUrl}seller`, data);
  }

  deletePermanent(data): Observable<any> {
    return this.http.delete(
      `${devUrl}userAccount?id=` + data.id + '&reason=' + data.reason
    );
  }

  postVerifyDocs(data): Observable<any> {
    return this.http.post(`${devUrl}seller/verifyDocument`, data);
  }

  sellerSignup(data) {
    return this.http.post(`${devUrl}signUp`, data);
  }

  getemailValidation(data) {
    return this.http.post(`${devUrl}validateEmail`, data);
  }

  // username validate
  postUserValidation(data) {
    return this.http.post(`${devUrl}userName?username=` + data, '');
  }

  countryList(data): Observable<any> {
    const url = `${devUrl}countries`;
    return this.http.get(`${url}`);
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

  // getSellerDetails(): Observable<any>{
  //   return this.http.get(`${devUrl}users/search`);
  // }

  getSellerAttributes(userId): Observable<any> {
    return this.http.get(`${devUrl}sellerAttributes`);
  }

  sellerLikesList(data) {
    return this.http.post(`${devUrl}referrals`, data);
  }

  sellerCommentsList(data) {
    return this.http.get(
      `${devUrl}comment?type=` + data.type + '&id=' + data.id
    );
  }

  reportGetList(data): Observable<any> {
    return this.http.get(`${devUrl}promoter?isPromoter=` + 'approved');
  }
}
