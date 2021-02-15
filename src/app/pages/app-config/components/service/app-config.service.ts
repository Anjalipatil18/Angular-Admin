import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url, devUrl } from 'src/app/global/global';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  constructor(private http: HttpClient) {}

  getAppConfig(): Observable<any> {
    return this.http.get(`${devUrl}appConfig`);
  }

  getAdminRoles(id?): Observable<any> {
    const url = id ? `${Url}adminRoles/?adminRoleId=` + id : `${Url}adminRoles`;
    return this.http.get(`${url}`);
  }

  getaddAdminRoles(data) {
    if (data._id) {
      return this.http.patch(`${Url}updateAdminRoles/`, data);
    } else {
      return this.http.post(`${Url}addAdminRoles/`, data);
    }
  }

  getRolesDelete(data) {
    return this.http.patch(`${Url}adminRolesAction/`, data);
  }

  getemailValidation(data) {
    return this.http.get(`${Url}adminUserCheckEmail/?email=` + data);
  }

  // getaddAppConfig(data){
  //   return this.http.patch(`${devUrl}appConfig/`, data);
  // }
  getaddAppConfig(data): Observable<any> {
    return this.http.patch(`${devUrl}appConfig`, data);
  }
  getAppConfigAction(data) {
    return this.http.patch(`${Url}AppConfigAction/`, data);
  }

  getadminUserResetPassword(data) {
    return this.http.patch(`${Url}adminUserResetPassword/`, data);
  }

  userSessionList(id) {
    return this.http.get(`${Url}AppConfigessions/?userId=` + id);
  }
}
