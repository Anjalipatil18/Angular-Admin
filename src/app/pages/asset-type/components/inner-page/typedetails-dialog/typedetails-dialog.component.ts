import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-typedetails-dialog',
  templateUrl: './typedetails-dialog.component.html',
  styleUrls: ['./typedetails-dialog.component.scss'],
})
export class TypedetailsDialogComponent implements OnInit {
  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  constructor(protected ref: NbDialogRef<TypedetailsDialogComponent>) {}

  ngOnInit() {
    // console.log(this.content);
  }

  cancel() {
    this.ref.close();
  }
}
