import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-usercolors-dialog',
  templateUrl: './usercolors-dialog.component.html',
  styleUrls: ['./usercolors-dialog.component.scss'],
})
export class UsercolorsDialogComponent implements OnInit {
  constructor(
    protected ref: NbDialogRef<UsercolorsDialogComponent>,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {}

  @Input() action: boolean;
  @Input() title: string;
  @Input() content: any;
  @Input() ok: string;
  @Input() cancelT: string;

  @Input() colors: boolean;
  addForm: FormGroup;
  formObj = {
    rCode: new FormControl(),
    gCode: new FormControl(),
    bCode: new FormControl(),
    colorName: new FormControl(),
  };

  reason = '';
  colorsData: any;
  private index = 0;

  ngOnInit() {
    if (this.colors) {
      this.reasonaddForm();
    }
  }

  reasonaddForm() {
    this.formObj.rCode = new FormControl('', [Validators.required]);
    this.formObj.gCode = new FormControl('', [
      Validators.required,
      Validators.maxLength(3),
    ]);
    this.formObj.bCode = new FormControl('', [Validators.required]);
    this.formObj.colorName = new FormControl('', [Validators.required]);
    this.addForm = this.formBuilder.group(this.formObj);
  }

  cancel() {
    this.ref.close();
  }
  showToast(position, msg, status) {
    this.index += 1;
    this.toastrService.show(
      msg || 'failed!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
  }

  getUsers(data: any) {
    const invalid = [];
    const dataVal = false;
    const controls = this.addForm.controls;
    // for (const name in controls) {
    for (const name of Object.keys(controls)) {
      console.log('controls', controls);
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    console.log('forms', this.addForm, this.addForm.controls);
    if (this.addForm.invalid || dataVal) {
      this.showToast('top-right', invalid + ' fields are missing!', 'danger');
      return;
    }
    console.log('modal comp form submit', data);
    this.colorsData = data;
    this.submit();
  }

  submit() {
    this.colors ? this.ref.close(this.colorsData) : this.ref.close();
  }
}
