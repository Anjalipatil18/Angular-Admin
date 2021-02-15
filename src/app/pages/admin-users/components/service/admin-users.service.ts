import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  constructor(private http: HttpClient) {}

  getAdminUsers(type): Observable<any> {
    if (type === 1) {
      return this.http.get(`${Url}adminUsers/`);
    } else {
      return this.http.get(`${Url}adminUsers/?status=` + type);
    }
  }

  getAdminRoles(id?): Observable<any> {
    const url = id
      ? `${Url}adminRoles/?adminRoleId=` + id
      : `${Url}adminRoles/`;
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

  getaddAdminUsers(data) {
    return this.http.post(`${Url}addAdminUsers/`, data);
  }

  getadminUsersAction(data) {
    return this.http.patch(`${Url}adminUsersAction/`, data);
  }

  getadminUserResetPassword(data) {
    return this.http.patch(`${Url}adminUserResetPassword/`, data);
  }

  userSessionList(id) {
    return this.http.get(`${Url}adminUserSessions/?userId=` + id);
  }
}
