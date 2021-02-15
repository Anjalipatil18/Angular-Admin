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
import { TextService } from '../../../service/text.service';

@Component({
  selector: 'app-promoter-privacy',
  templateUrl: './promoter-privacy.component.html',
  styleUrls: ['./promoter-privacy.component.scss'],
})
export class PromoterPrivacyComponent implements OnInit {
  form: FormGroup;
  privacy: any;
  textColor = 'black';
  formObj = {};
  checkData = false;
  allDataList: any;
  langSelectors = [];
  tabList: any;
  listLang: any;
  hide = false;
  selectedLanguagFromDropDown: any;

  @ViewChild('editor', {
    static: true,
  })
  editor: QuillEditorComponent;
  selectedLanguage;
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
    this.languageActive();
    this.setControl('en');
    // this.reasonaddForm();
    this.form.controls.editor.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        // tslint:disable-next-line:no-console
        console.log('native fromControl value changes with debounce', data);
      });

    this.editor.onContentChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        if (data.html == null) {
          this.checkData = false;
        } else {
          this.checkData = true;
        }
        // tslint:disable-next-line:no-console
        // console.log('view child + directly subscription', data)
        this.privacy = data;
      });
  }

  setControl(language?) {
    const list = {
      userType: 2,
      lan: language ? language : 'en',
    };
    this.service.getPrivacy(list).subscribe(
      (res: any) => {
        console.log('asdas', res);
        if (res) {
          this.form.setControl(
            'editor',
            new FormControl(res.result.privacyPolicy)
          );
        }
        // console.log('deleteUser/'+list.deleteStatus, res);
        // this.ref.close(this.content.deleteStatus);
      },
      error => {
        console.log('error', error);
      }
    );
  }
  patchValue() {
    if (!this.checkData) {
      this.showToast('top-right', 'text are missing!', 'danger');
      return;
    }
    console.log(this.privacy.html);
    const list = {
      privacyPolicy: this.privacy.html,
      userType: 2,
      lan: this.selectedLanguagFromDropDown
        ? this.selectedLanguagFromDropDown.languageCode
        : 'en',
    };
    this.service.postPrivacy(list).subscribe(
      (res: any) => {
        console.log('asdas', res);
        this.showToast(
          'top-right',
          'promoter privacy added successfully!',
          'success'
        );
      },
      error => {
        console.log('error', error);
      }
    );
  }
  languageActive() {
    this.service.languageActive().subscribe(
      (res: any) => {
        console.log('language', res);
        this.listLang = res.result;
        this.selectedLanguage = this.listLang[0].language;
        this.listLang.map(x => {
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });
          // console.log(x.languageCode);
          // this.formObj['title_' + x.languageCode] = new FormControl('');
        });
        //  this.addForm()
        // const index = this.langSelectors.findIndex(
        //   x => x.languageCode === 'en'
        // );
        // console.log('index ', index);
        // if (index > -1) {
        //   this.langSelectors[index].active = true;
        //   this.form.controls[
        //     'title_' + this.langSelectors[index].languageCode
        //   ].setValidators(Validators.required);
        //   this.form.controls[
        //     'title_' + this.langSelectors[index].languageCode
        //   ].updateValueAndValidity();
        // }
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaa',this.langSelectors,this.subId , typeof this.subId);

        // if (this.subId !== '1') {
        //   this.getEditSupportText()
        // } else {
        //   const titleST =
        //     this.triggerId === '1'
        //       ? 'Types'
        //       : this.triggerId === '2'
        //       ? 'Sub Type'
        //       : 'Sub Sub Type'
        //   const title = 'Add'
        //   const breadcrumb = { subTypeT: titleST, subTypeE: title }
        //   this._breadCrumb.updateBreadcrumbLabels(breadcrumb)
        // }
      },
      error => {
        console.log(error);
      }
    );
  }
  // reportCheckbox(event, i, lang) {
  //   this.langSelectors[i].active = event.target.checked;
  //   if (event.target.checked) {
  //     this.form.controls['title_' + lang].setValidators(
  //       Validators.required
  //     );
  //     this.form.controls['title_' + lang].updateValueAndValidity();
  //   } else {
  //     this.form.controls['title_' + lang].setValidators(null);
  //     this.form.controls['title_' + lang].updateValueAndValidity();
  //     this.form.controls['title_' + lang].setValue('');
  //   }
  //   // console.log('thisadduserform', this.addUserForm);
  // }
  filterLanguage(event?) {
    // if(event){
    //   this.selectedLanguagFromDropDown = event;
    //   this.setControl(this.selectedLanguagFromDropDown.languageCode);
    // }
  }
  getData(event) {
    if (event) {
      this.selectedLanguagFromDropDown = event;
      this.setControl(this.selectedLanguagFromDropDown.languageCode);
    }
  }
}
