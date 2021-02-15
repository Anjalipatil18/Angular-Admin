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
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  hide = false;
  form: FormGroup;
  terms: any;
  tabList: any;
  // backgroundColor = ''
  textColor = 'black';
  formObj = {};
  checkData = false;

  @ViewChild('editor', {
    static: true,
  })
  editor: QuillEditorComponent;

  constructor(
    fb: FormBuilder,
    private service: TextService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.form = fb.group({
      editor: [''],
    });
  }
  showToast(position, msg, status) {
    // this.index += 1;
    this.toastrService.show(
      msg || 'failed!',
      'Alert message',
      // `Toast ${this.index}`,
      { position, status }
    );
  }
  ngOnInit() {
    // this.setControl()
    // // this.reasonaddForm();
    // this.form.controls.editor.valueChanges
    //   .pipe(debounceTime(400), distinctUntilChanged())
    //   .subscribe(data => {
    //     // tslint:disable-next-line:no-console
    //     console.log('native fromControl value changes with debounce', data)
    //   })
    // this.editor.onContentChanged
    //   .pipe(debounceTime(400), distinctUntilChanged())
    //   .subscribe(data => {
    //     this.checkData = true
    //     this.terms = data
    //   })
  }
  // setControl() {
  //   const list = {
  //     id: '',
  //   }
  //   this.service.getTerms(list).subscribe(
  //     (res: any) => {
  //       console.log('asdas', res)
  //       this.form.setControl(
  //         'editor',
  //         new FormControl(res.result.termsAndConditions)
  //       )
  //     },
  //     error => {
  //       console.log('error', error)
  //     }
  //   )
  // }

  // patchValue() {
  //   if (!this.checkData || this.terms.html == null) {
  //     this.showToast('top-right', 'text are missing!', 'danger')
  //     return
  //   }
  //   console.log(this.terms.html)
  //   const list = {
  //     termsAndConditions: this.terms.html,
  //   }

  //   this.service.postTerms(list).subscribe(
  //     (res: any) => {
  //       console.log('asdas', res)
  //     },
  //     error => {
  //       console.log('error', error)
  //     }
  //   )
  // }
  selectTab(event) {
    console.log(event.tabTitle);
    this.tabList = event.tabTitle;
  }
}
