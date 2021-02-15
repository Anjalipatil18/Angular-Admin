import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-userseller-dialog',
  templateUrl: './userseller-dialog.component.html',
  styleUrls: ['./userseller-dialog.component.scss'],
})
export class UsersellerDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<UsersellerDialogComponent>) {}

  reason = '';
  profilePickture = '../../../../../../assets/images/defaultPerson.png';

  ngOnInit() {
    console.log(this.profilePickture);
    console.log('dialog data', this.content);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }
}
