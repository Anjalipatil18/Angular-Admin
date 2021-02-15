import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TextService } from './../service/text.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit {
  // hide = false
  // form: FormGroup;
  // privacy:any;
  // // backgroundColor = '';
  // textColor = 'black';
  // formObj = {};
  // checkData = false;
  // allDataList:any;

  tabList: any;

  @ViewChild('editor', {
    static: true,
  })
  editor: QuillEditorComponent;
  constructor() {}
  // constructor(fb: FormBuilder, private _service:TextService,private formBuilder: FormBuilder,private toastrService: NbToastrService) {
  //   this.form = fb.group({
  //      editor: ['']
  //   })
  // }
  // showToast(position, msg, status) {
  //   // this.index += 1;
  //   this.toastrService.show(
  //     msg || 'failed!',
  //     'Alert message',
  //     // `Toast ${this.index}`,
  //     { position, status });
  // }
  ngOnInit() {
    // this.setControl();
    // // this.reasonaddForm();
    // this.form
    //   .controls
    //   .editor
    //   .valueChanges.pipe(
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((data) => {
    //     // tslint:disable-next-line:no-console
    //     console.log('native fromControl value changes with debounce', data)
    //   })
    // this.editor
    //   .onContentChanged
    //   .pipe(
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((data) => {
    //     this.checkData = true;
    //     // tslint:disable-next-line:no-console
    //     // console.log('view child + directly subscription', data)
    //     this.privacy = data;
    //   })
  }
  // reasonaddForm() {
  //   this.formObj['form.controls["editor"]'] = new FormControl("", [Validators.required]);
  //   this.form = this.formBuilder.group(this.formObj);

  // }
  // setControl() {

  //   const list = {
  //     id:'',
  //   }
  //   this._service.getPrivacy(list).subscribe(
  //     (res: any) => {
  //       console.log('asdas',res);
  //       this.form.setControl('editor', new FormControl(res.result.privacyPolicy))
  //       // console.log('deleteUser/'+list.deleteStatus, res);
  //       // this.ref.close(this.content.deleteStatus);
  //     },
  //     error => {
  //       console.log('error',error);
  //     }
  //   );
  // }

  // patchValue() {
  //   // const invalid = [];
  //   // const controls = this.form.controls;
  //   // for (const name in controls) {
  //   //     if (controls[name].invalid) {
  //   //         invalid.push(name);
  //   //     }
  //   // }
  //   // console.log(this.privacy.html);
  //   if (!this.checkData) {
  //     this.showToast('top-right', 'text are missing!', 'danger');
  //     return;
  //   }
  //   console.log(this.privacy.html);
  //   const list = {
  //     privacyPolicy  :this.privacy.html
  //   }
  //   // this.form.get('editor').patchValue(`${this.form.get('editor').value}`)
  //   this._service.postPrivacy(list).subscribe(
  //     (res: any) => {
  //       console.log('asdas',res);
  //       // console.log('deleteUser/'+list.deleteStatus, res);
  //       // this.ref.close(this.content.deleteStatus);
  //     },
  //     error => {
  //       console.log('error',error);
  //     }
  //   );
  // }
  selectTab(event) {
    console.log(event.tabTitle);
    this.tabList = event.tabTitle;
  }
}
