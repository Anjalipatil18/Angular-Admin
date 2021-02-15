import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { DialogRoleComponent } from './dialog-role/dialog-role.component';
import { AdminUsersService } from './../service/admin-users.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  roles: any;
  rolesSearch = [];
  rolesData = [];
  columns: any;

  constructor(
    private service: AdminUsersService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.getAllRoles();
  }

  // get enabled roles
  getAllRoles(id?) {
    this.service.getAdminRoles(id).subscribe(
      (res: any) => {
        console.log('adminRoles/' + id, res);
        if (id) {
          res.result[0]._id = id;
          this.openDialog(res.result[0]);
        } else {
          this.roles = res.result;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // search in active roles
  searchrolesActive(value) {
    this.rolesSearch = [];
    this.rolesData = [];
    if (value && this.roles && this.roles.length > 0) {
      this.rolesData = this.roles;
      this.rolesData.map(data => {
        if (data.role.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.rolesSearch.push(data);
        }
      });
      this.rolesData = this.rolesSearch;
    } else {
      console.log('else');
    }
  }

  rolesDelete(id, index) {
    const list = {
      id: [id],
    };
    this.service.getRolesDelete(list).subscribe(
      (res: any) => {
        console.log('adminRolesAction', res);
        this.roles.splice(index, 1);
        this.roles = [...this.roles];
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRoles(id, index) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'By deleting this, users linked to this role will get deleted',
          content: 'Are you sure you want to delete it ?',
          ok: 'Delete it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.rolesDelete(id, index);
        }
      });
  }

  openDialog(data?) {
    this.dialogService
      .open(DialogRoleComponent, {
        context: {
          action: false,
          title: data ? 'Update Role' : 'Add Role',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
        if (res) {
          this.addRole(res);
        }
      });
  }

  addRole(data) {
    this.service.getaddAdminRoles(data).subscribe(
      (res: any) => {
        console.log('addAdminRoles', res);
        this.getAllRoles();
      },
      error => {
        console.log(error);
      }
    );
  }
}
