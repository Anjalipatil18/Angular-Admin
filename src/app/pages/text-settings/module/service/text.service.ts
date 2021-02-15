import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Url } from 'src/app/global/global';
import { devUrl } from 'src/app/global/global';
import { Configuration } from 'src/app/global/global-config';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private http: HttpClient, private conf: Configuration) {}
  // post privacy text
  postPrivacy(data): Observable<any> {
    console.log(data);
    // let headers = new HttpHeaders();
    // headers.append('lan', lan);
    // headers: request.headers.set('lan', 'en');
    return this.http.post(`${devUrl}privacyPolicy`, data);
  }

  // get privacy text
  getPrivacy(data): Observable<any> {
    console.log(data);
    // let headers = new HttpHeaders();
    // headers.set('lan', lan);
    // let Oheaders = headers.set('lan', lan);
    // console.log(Oheaders);
    // const httpOptions = {

    // headers: new HttpHeaders({
    //   'lan':  lan
    // })};
    return this.http.get(
      `${devUrl}privacyPolicy?userType=` + data.userType + '&lan=' + data.lan
    );

    // return this.http.get(`${devUrl}privacyPolicy?userType=`+data.userType )
  }
  // post Terms & condition text
  postTerms(data): Observable<any> {
    return this.http.post(`${devUrl}termsAndConditions`, data);
  }

  // get Terms & condition text
  getTerms(data): Observable<any> {
    return this.http.get(
      `${devUrl}termsAndConditions?userType=` +
        data.userType +
        '&lan=' +
        data.lan
    );
  }

  // get active languge
  languageActive(): Observable<any> {
    return this.http.get(`${Url}language/?status=1`);
  }
}
