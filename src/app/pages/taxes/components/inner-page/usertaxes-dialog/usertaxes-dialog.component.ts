import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-usertaxes-dialog',
  templateUrl: './usertaxes-dialog.component.html',
  styleUrls: ['./usertaxes-dialog.component.scss'],
})
export class UsertaxesDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UsertaxesDialogComponent>) {}

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
