import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from '../../../../../global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient, private conf: Configuration) {}
  // get active language
  languageList(): Observable<any> {
    return this.http.get(`${Url}languageCodes/`);
  }

  languageAdd(data): Observable<any> {
    return this.http.get(`${Url}addLanguage/?shortcode=${data}`);
  }

  language(): Observable<any> {
    return this.http.get(`${Url}language/`);
  }

  addorDeleteLang(id, status): Observable<any> {
    return this.http.get(`${Url}languageAction/?id=${id}&status=${status}`);
  }

  citiesAdd(data, cityId): Observable<any> {
    if (cityId === 1) {
      return this.http.post(`${Url}addCityAPI/`, data);
    } else {
      data.id = cityId;
      return this.http.post(`${Url}updateCityAPI/`, data);
    }
  }

  updateCity(): Observable<any> {
    return this.http.get(`${Url}updateCityAPI/`);
  }
}
