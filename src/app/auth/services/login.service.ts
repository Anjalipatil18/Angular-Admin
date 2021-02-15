import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from './../../global/global';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };
    return this.http.post(`${Url}login/`, data);
  }

  getIpAddress() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    });
    console.log('new haeder', headers);
    return this.http.get('https://ipapi.co/json', { headers });
  }

  UserAddSession(data): Observable<any> {
    return this.http.post(`${Url}adminUserAddSessionData/`, data);
  }

  getUserAddSession(data): Observable<any> {
    return this.http.patch(`${Url}adminUserAddSessionData/`, data);
  }

  getUserDeleteSession(data): Observable<any> {
    return this.http.patch(`${Url}logout/`, data);
  }
}
