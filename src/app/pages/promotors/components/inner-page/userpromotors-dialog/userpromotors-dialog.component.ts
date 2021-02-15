import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
// declare var moment:any;
@Component({
  selector: 'app-userpromotors-dialog',
  templateUrl: './userpromotors-dialog.component.html',
  styleUrls: ['./userpromotors-dialog.component.scss'],
})
export class UserpromotorsDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UserpromotorsDialogComponent>) {}

  reason = '';
  profilePickture = '../../../../../../assets/images/defaultPerson.png';

  ngOnInit() {
    console.log(this.profilePickture);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }

  /**
   *
   *
   * @param date Date to be Formatted
   * @returns Date of format  01 11 2019
   */
  getMomentDate(date) {
    return moment(date).format('DD MMM YYYY');
  }
}
