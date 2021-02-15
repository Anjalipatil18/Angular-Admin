import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UsersService } from './../../service/users.service';

@Component({
  selector: 'app-userdetails-dialog',
  templateUrl: './userdetails-dialog.component.html',
  styleUrls: ['./userdetails-dialog.component.scss'],
})
export class UserdetailsDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(
    protected ref: NbDialogRef<UserdetailsDialogComponent>,
    private service: UsersService
  ) {}

  reason = '';

  ngOnInit() {
    console.log(this.content);
    if (this.content.deleteStatus === '5') {
      this.reason = 'true';
    } else {
      this.reason = '';
    }
  }

  cancel() {
    this.ref.close();
  }

  submit(val: any) {
    // this.ref.close(val);
    const list = {
      deleteStatus: this.content.deleteStatus,
      id: this.content.id,
      reason: this.reason,
    };
    // console.log(list)
    this.service.usersStatusList(list).subscribe(
      (res: any) => {
        console.log('deleteUser/' + list.deleteStatus, res);
        this.ref.close(this.content.deleteStatus);
      },
      error => {
        console.log(error);
      }
    );
  }
}
