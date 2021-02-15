import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  attributesListEdit(id) {
    return this.http.get(`${Url}attributes/?attributeId=` + id + '&isSeller=1');
  }

  attributesList(data) {
    return this.http.get(
      `${Url}attributes/?set=` +
        data.set +
        '&limit=' +
        data.limit +
        '&status=' +
        data.status +
        '&isSeller=1'
    );
  }

  deleteAttributes(data) {
    return this.http.patch(`${Url}deleteAttributes/?isSeller=1`, data);
  }

  addAtrribute(data, id) {
    if (id !== '1') {
      data.id = id;
      console.log(data);
      return this.http.patch(`${Url}updateAttributes/?isSeller=1`, data);
    } else {
      return this.http.post(`${Url}addAttributes/?isSeller=1`, data);
    }
  }

  // get units list
  getUnitsList(): Observable<any> {
    return this.http.get(`${devUrl}units`);
  }
}
