import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Configuration {
  support: boolean;

  constructor(private Cookie: CookieService) {
    const storage =
      typeof window.localStorage === 'undefined'
        ? undefined
        : window.localStorage;
    const supported = !(
      typeof storage === undefined || typeof window === undefined
    );
    this.support = supported || false;
  }

  // storage list

  setItem(item, val) {
    if (!this.support) {
      this.Cookie.set(item, val, 1, '/');
    } else {
      localStorage.setItem(item, val);
    }
  }

  getItem(item) {
    if (!this.support) {
      return this.Cookie.get(item);
    } else {
      return localStorage.getItem(item);
    }
  }

  removeItem(item) {
    if (!this.support) {
      this.Cookie.delete(item, '/');
    } else {
      localStorage.removeItem(item);
    }
  }

  clear() {
    if (!this.support) {
      this.Cookie.deleteAll('/');
    } else {
      localStorage.clear();
    }
  }
}
