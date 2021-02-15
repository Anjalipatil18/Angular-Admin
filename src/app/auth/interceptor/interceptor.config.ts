import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Configuration } from './../../global/global-config';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: NbToastrService,
    private conf: Configuration,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.conf.getItem('token');
    if (token) {
      console.log('aaaaaaaaaaaaaa');
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 800);
      request = request.clone({
        headers: request.headers.set('authorization', token),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    if (!request.headers.has('device')) {
      request = request.clone({
        headers: request.headers.set('device', 'web'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    const urlDev = request.url.split('/');
    if (urlDev[2] === 'api.lopongo.com') {
      request = request.clone({
        headers: request.headers.set('lan', 'en'),
      });
    }
    // console.log(request)
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // this.spinner.hide();
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status,
        };
        console.log('interceptor', error);
        // this.toastrService.danger(error.statusText);
        return throwError(error);
      })
    );
  }
}
