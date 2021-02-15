import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AdminUsersService } from './../../service/admin-users.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
})
export class UsersDialogComponent implements OnInit {
  constructor(
    protected ref: NbDialogRef<UsersDialogComponent>,
    private service: AdminUsersService
  ) {}

  get f() {
    return this.addForm.controls;
  }
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  addForm: FormGroup;
  submitted = false;
  roles: any;
  emailVaild: any;

  pwdVaild: any;

  ngOnInit() {
    this.usersAddForm();
    if (!this.action) {
      setTimeout(() => {
        this.getAllRoles();
      }, 300);
    }
  }

  getAllRoles() {
    this.service.getAdminRoles().subscribe(
      (res: any) => {
        console.log('adminRoles/', res);
        this.roles = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  emailValidation(data) {
    this.service.getemailValidation(data).subscribe(
      (res: any) => {
        console.log('adminUserCheckEmail/', res);
        this.emailVaild = true;
      },
      error => {
        this.emailVaild = false;
        console.log('yes');
      }
    );
  }

  cancel() {
    this.ref.close();
  }

  usersAddForm() {
    if (this.action) {
      this.addForm = new FormGroup({
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        cPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      });
    } else {
      this.addForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        roleId: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      });
    }
  }

  getUsers(data: any) {
    this.emailValidation(data.email);
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    if (!this.emailVaild) {
      this.service.getaddAdminUsers(data).subscribe(
        (res: any) => {
          console.log('addAdminUsers/', res);
          this.ref.close(1);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  getUsersPswd(data) {
    this.submitted = true;
    this.pwdVaild = false;
    if (this.addForm.invalid) {
      return;
    }

    const list = {
      userId: this.content,
      newPassword: data.cPassword,
    };
    if (data.password === data.cPassword) {
      this.service.getadminUserResetPassword(list).subscribe(
        (res: any) => {
          console.log('adminUserResetPassword/', res);
          this.ref.close(1);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.pwdVaild = true;
    }
  }
}
