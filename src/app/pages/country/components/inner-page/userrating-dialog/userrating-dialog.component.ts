import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-userrating-dialog',
  templateUrl: './userrating-dialog.component.html',
  styleUrls: ['./userrating-dialog.component.scss'],
})
export class UserratingDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UserratingDialogComponent>) {}

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
