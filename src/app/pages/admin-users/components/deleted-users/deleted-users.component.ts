import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
// import { DialogRoleComponent } from './dialog-role/dialog-role.component';
import { Configuration } from 'src/app/global/global-config';
import { Router } from '@angular/router';
import { AdminUsersService } from './../service/admin-users.service';

@Component({
  selector: 'app-deleted-users',
  templateUrl: './deleted-users.component.html',
  styleUrls: ['./deleted-users.component.scss'],
})
export class DeletedUsersComponent implements OnInit {
  constructor(
    private service: AdminUsersService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private conf: Configuration,
    private router: Router
  ) {}

  reasons: any;
  statusId = [];
  reasonsSearch = [];
  reasonsData = [];
  columns: any;
  type: any;

  ngOnInit() {
    this.getDeletedUsers();
  }

  // get enabled reasons
  /**
   * @param type number this is type for user
   */
  getDeletedUsers() {
    this.type = 3;
    this.service.getAdminUsers(this.type).subscribe(
      (res: any) => {
        this.reasons = res.result;
      },
      error => {
        console.log(error);
      }
    );
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
  }

  /**
   * @param * status which i need to send to api
   * @description this function using for open dialogbox and perform action (delete user)
   * @returns getting successfull msg from api side
   */
  openDialog(status) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'Delete',
          content: 'Are you sure you want to delete it ?',
          ok: 'Yes, delete it !!',
          cancelT: 'No, cancel it !!',
        },
      })
      .onClose.subscribe(ress => {
        if (ress) {
          const list = {
            deleteStatus: status,
            id: this.statusId,
          };
          this.service.getadminUsersAction(list).subscribe(
            (res: any) => {
              console.log('deleteAttributes', res);
              this.statusId = [];
              console.log(this.statusId);
              this.getDeletedUsers();

              // this.userActive = []
              // // this.listTable.emit(1);
              // this.getAllUsers()
            },
            error => {
              console.log(error);
            }
          );
        }
      });
  }
}
