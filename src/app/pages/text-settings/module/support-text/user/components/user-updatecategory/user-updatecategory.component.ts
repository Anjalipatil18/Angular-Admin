import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SupportTextService } from '../../../service/support-text.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/global/global-config';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-user-updatecategory',
  templateUrl: './user-updatecategory.component.html',
  styleUrls: ['./user-updatecategory.component.scss'],
})
export class UserUpdatecategoryComponent implements OnInit {
  public Editor = ClassicEditor;

  addUserForm: FormGroup;
  userDataFrench = false;
  hasScat = false;
  submitted = false;
  supportTextId: any;
  sCatId: any;
  userCatList: any;
  resEdit: any;
  userData: any;
  listLang: any;
  langSelectors = [];
  formObj = {};

  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: SupportTextService,
    private conf: Configuration,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.supportTextId = params.id;
      this.sCatId = params.sId;
    });
    this.languageActive();
  }

  languageActive() {
    this.service.languageActive().subscribe(
      (res: any) => {
        console.log('language', res);
        this.listLang = res.result;
        this.listLang.map(x => {
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });
          this.formObj['category_' + x.languageCode] = new FormControl('');
          this.formObj['description_' + x.languageCode] = new FormControl('');
        });
        this.addForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addUserForm.controls[
            'category_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addUserForm.controls[
            'category_' + this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }

        if (this.supportTextId !== this.sCatId) {
          this.getEditSupportText();
        } else {
          const userTitle = this.sCatId === '1' ? 'Category' : 'Sub Category';
          const updateTitle = 'Add';
          const breadcrumb = { userTitle, updateTitle };
          this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addForm() {
    this.addUserForm = this.formBuilder.group(this.formObj);
  }

  reportCheckbox(event, i, lang) {
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addUserForm.controls['category_' + lang].setValidators(
        Validators.required
      );
      this.addUserForm.controls['category_' + lang].updateValueAndValidity();
    } else {
      this.addUserForm.controls['category_' + lang].setValidators(null);
      this.addUserForm.controls['category_' + lang].updateValueAndValidity();
      this.addUserForm.controls['category_' + lang].setValue('');
      this.addUserForm.controls['description_' + lang].setValue('');
    }
  }

  getEditSupportText() {
    this.service.supportTextUserList(1, this.supportTextId).subscribe(
      (res: any) => {
        console.log('supportText/userType=1/id', res);
        if (this.sCatId !== '1') {
          res.result[0].sub_cat.forEach(x => {
            if (x.subCatId === this.sCatId) {
              this.resEdit = x.categoryLang;
              this.userData = x;
            }
          });
        } else {
          this.resEdit = res.result[0].categoryLang;
          this.hasScat = res.result[0].hasScat;
          this.userData = res.result[0];
        }
        for (const prop in this.resEdit) {
          if (this.resEdit[prop]) {
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
          }
        }

        this.langSelectors.map(x => {
          if (x.active) {
            this.addUserForm.controls['category_' + [x.languageCode]].setValue(
              this.userData['category_' + [x.languageCode]]
            );
            this.addUserForm.controls[
              'description_' + [x.languageCode]
            ].setValue(this.userData['description_' + [x.languageCode]]);
            this.addUserForm.controls[
              'category_' + [x.languageCode]
            ].setValidators(Validators.required);
            this.addUserForm.controls[
              'category_' + [x.languageCode]
            ].updateValueAndValidity();
          }
        });

        const titleEn = this.userData.category_en;
        const userTitle = this.sCatId === '1' ? 'Category' : 'Sub Category';
        const updateTitle = 'Edit';
        const breadcrumb = {
          userTitle: userTitle + '(' + titleEn + ')',
          updateTitle,
        };
        this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
      },
      error => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.addUserForm.controls;
  }

  getUsers(data: any) {
    console.log('get users', data);
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    const cat = {
      userType: 1,
      hasScat: this.sCatId !== '1' ? true : this.hasScat,
      supportTextId: this.supportTextId,
      subCatId: this.sCatId,
    };
    for (const prop in data) {
      if (data[prop]) {
        cat[prop] = data[prop];
      }
    }

    if (this.sCatId === this.supportTextId || this.sCatId === '1') {
      delete cat.supportTextId;
      delete cat.subCatId;
    }

    if (this.supportTextId !== '1') {
      cat.supportTextId = this.supportTextId;
    }

    console.log('cat', cat);
    const id = this.supportTextId !== this.sCatId ? this.supportTextId : '';
    console.log('id------------------>', id, cat);
    this.service.addSupportUserList(cat, id).subscribe(
      (res: any) => {
        this.location.back();
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  hasSubCat(event) {
    // console.log('event', event)
    this.hasScat = event.target.checked;
    if (this.hasScat) {
      this.langSelectors.map(x => {
        if (x.active) {
          this.addUserForm.controls['description_' + [x.languageCode]].setValue(
            ''
          );
        }
      });
    }
  }

  back() {
    this.location.back();
  }
}
