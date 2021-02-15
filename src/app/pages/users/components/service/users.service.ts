import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl, UrlLink } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private conf: Configuration) {}
  // get active users
  usersList(data): Observable<any> {
    return this.http.get(
      `${Url}users/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status +
        '&searchedKey=' +
        data.searchedKey +
        '&userType=' +
        data.userType
    );
  }
  // updateUser/5c2f3721c300b20633e1feb8
  usersListEdit(id): Observable<any> {
    return this.http.get(`${Url}users/?userId=` + id);
  }
  usersListUpdate(data, id): Observable<any> {
    return this.http.patch(`${Url}updateUser/?id=${id}`, data);
  }

  sharedProductLogs(id): Observable<any> {
    const Urls = `${devUrl}sharedProductLogs` + `?userId=` + id;
    return this.http.get(`${Urls}`);
  }

  usersStatusList(data) {
    return this.http.patch(`${Url}deleteUser/`, data);
  }

  usersDevice(data) {
    return this.http.get(
      `${Url}userDeviceLogs/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&userId=' +
        data.id
    );
  }
  // https://devapi.wexxle.io/asset/users/1/5cfa7365af5e9e466e5d3400
  tagUsers(data) {
    return this.http.get(
      `${UrlLink}assets/?status=` + data.status + '&userId=' + data.userId
    );
  }

  tagFollow(data) {
    const url =
      data.statusCode === 1
        ? `${devUrl}follow/followers/` + data.userId
        : `${devUrl}follow/followees/` + data.userId;
    return this.http.get(`${url}`);
  }
}
