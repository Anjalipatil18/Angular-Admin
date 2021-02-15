import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-usertags-dialog',
  templateUrl: './usertags-dialog.component.html',
  styleUrls: ['./usertags-dialog.component.scss'],
})
export class UsertagsDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UsertagsDialogComponent>) {}

  reason = '';

  ngOnInit() {
    // console.log(this.content);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }
}
