import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { AdminUsersService } from './../service/admin-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private service: AdminUsersService,
    private dialogService: NbDialogService
  ) {}

  reasons: any;
  reasonsSearch = [];
  reasonsData = [];
  columns: any;
  type: any;

  statusId = [];

  // reasons: any;
  // reasonsSearch = [];
  // reasonsData = [];
  // columns:any;
  // type:any;

  // statusId = [];

  ngOnInit() {
    this.getAllUsers();
  }

  // get enabled reasons
  getAllUsers() {
    this.type = 1; // 1  =  active user // 2 = suspended // 3 = deleted user
    this.service.getAdminUsers(this.type).subscribe(
      (res: any) => {
        console.log('adminUsers', res);
        this.reasons = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  // search in active reasons
  searchReasonsActive(value) {
    this.reasonsSearch = [];
    this.reasonsData = [];
    if (value && this.reasons && this.reasons.length > 0) {
      this.reasonsData = this.reasons;
      this.reasonsData.map(data => {
        if (data.userName.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.reasonsSearch.push(data);
        }
      });
      this.reasonsData = this.reasonsSearch;
    } else {
      console.log('else');
    }
  }

  openDialog() {
    this.dialogService
      .open(UsersDialogComponent, {
        context: {
          action: false,
          title: 'Add Users',
          content: 'Add Data',
          ok: 'Update it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        console.log('RES', res);
        if (res) {
          this.getAllUsers();
        }
      });
  }
  reportCheckbox(event, id) {
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
    // console.log(this.statusId);
  }

  usersDelete(status) {
    // this.roles.splice(index, 1);
    // this.roles = [...this.roles];
    const list = {
      deleteStatus: status,
      id: this.statusId,
    };
    console.log(list);
    this.service.getadminUsersAction(list).subscribe(
      (res: any) => {
        this.statusId = [];
        this.reasons = [];
        this.getAllUsers();
        console.log('adminUsersAction', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRoles(status) {
    const titles =
      status === 1 ? 'Activate' : status === 2 ? 'Suspend' : 'Delete';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: titles,
          content: 'Are you sure you want to ' + titles + ' it ?',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
        if (res) {
          this.usersDelete(status);
        }
      });
  }

  editPwd(id) {
    this.dialogService
      .open(UsersDialogComponent, {
        context: {
          action: true,
          title: 'RESET PASSWORD',
          content: id,
          ok: 'Change it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
        if (res) {
          // this.getAllUsers();
        }
      });
  }
}
