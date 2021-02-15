import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-usermodels-dialog',
  templateUrl: './usermodels-dialog.component.html',
  styleUrls: ['./usermodels-dialog.component.scss'],
})
export class UsermodelsDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UsermodelsDialogComponent>) {}

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
