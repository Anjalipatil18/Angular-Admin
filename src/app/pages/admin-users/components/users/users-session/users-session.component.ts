import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from '../../service/admin-users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-session',
  templateUrl: './users-session.component.html',
  styleUrls: ['./users-session.component.scss'],
})
export class UsersSessionComponent implements OnInit {
  constructor(
    private service: AdminUsersService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  userSessionData: any = [];
  columns: any;
  userSession: any;

  userSessionSearch: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sessionId = params.id;
      this.getAlluserSession(sessionId);
    });
  }

  back() {
    this.location.back();
  }

  // get session
  getAlluserSession(id) {
    this.service.userSessionList(id).subscribe(
      (res: any) => {
        console.log('adminUserSessions', res);
        this.userSession = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }
  searchuserSessionActive(value) {
    this.userSessionSearch = [];
    this.userSessionData = [];
    if (value) {
      this.userSessionData = this.userSession;
      this.userSessionData.map(data => {
        if (data.action.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.userSessionSearch.push(data);
        }
      });
      this.userSessionData = this.userSessionSearch;
    } else {
      console.log('else');
    }
  }
}
