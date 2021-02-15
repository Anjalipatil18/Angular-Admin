import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Configuration } from 'src/app/global/global-config';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../auth/services/login.service';
import * as moment from 'moment';
declare var google;
@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  language = 'en';
  userName: any;
  latitude: number;
  longitude: number;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private conf: Configuration,
    private route: Router,
    public translate: TranslateService,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.userName = this.conf.getItem('username') || 'Lopongo';
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    // this.analyticsService.trackEvent('startSearch');
  }

  logout() {
    const sessionLogId = this.conf.getItem('sessionLogId');
    const list = {
      createdAt: moment().valueOf(),
      action: 'logout',
      sessionLogId,
    };
    this.service.getUserAddSession(list).subscribe(
      (res: any) => {
        console.log('UserAddSessionData/logout', res);
        this.tokenExpiry();
        // this.conf.clear();
        // this.route.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @description get dynamic position from navigator function
   * @author bhavesh jain
   * @returns let = 13.023807099999999,long = 77.5963159
   */
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  /**
   * @author bhavesh jain
   * @description get lat and long
   * @param * position setting the postion to Properties
   */
  showPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }
  tokenExpiry() {
    const userId = this.conf.getItem('userId');
    const refreshToken = this.conf.getItem('refreshToken');
    const list = {
      sessionEnd: moment().valueOf(),
      action: 'logout',
      latitude: this.latitude,
      longitude: this.longitude,
      deviceId: 'web_app_id',
      userType: 'admin',
      refreshToken,
      time: '5',
    };
    this.service.getUserDeleteSession(list).subscribe(
      (res: any) => {
        console.log('logout api', res);
        this.conf.clear();
        this.route.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
