import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Configuration } from '.././global/global-config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private conf: Configuration) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.conf.getItem('token')) {
      this.router.navigate(['login']);
      return false;
    }

    // this.router.navigate(['']);
    return true;
  }
}
