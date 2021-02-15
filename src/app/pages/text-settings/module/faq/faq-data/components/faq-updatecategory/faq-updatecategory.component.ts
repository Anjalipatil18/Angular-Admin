import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FaqService } from '../../../service/faq.service';
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
  templateUrl: './faq-updatecategory.component.html',
  styleUrls: ['./faq-updatecategory.component.scss'],
})
export class FaqUpdatecategoryComponent implements OnInit {
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
    private service: FaqService,
    private conf: Configuration,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.supportTextId = params.id;
      this.sCatId = params.sId;
      console.log('idsssssssssss  ', this.sCatId);
      console.log('this.supportTextId  ', this.supportTextId);
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
          this.formObj['title_' + x.languageCode] = new FormControl('');
          this.formObj['description_' + x.languageCode] = new FormControl('');
        });
        this.addForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addUserForm.controls[
            'title_' + this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addUserForm.controls[
            'title_' + this.langSelectors[index].languageCode
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
      this.addUserForm.controls['title_' + lang].setValidators(
        Validators.required
      );
      this.addUserForm.controls['title_' + lang].updateValueAndValidity();
    } else {
      this.addUserForm.controls['title_' + lang].setValidators(null);
      this.addUserForm.controls['title_' + lang].updateValueAndValidity();
      this.addUserForm.controls['title_' + lang].setValue('');
      this.addUserForm.controls['description_' + lang].setValue('');
    }
  }

  getEditSupportText() {
    this.service.getFaqList().subscribe(
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
            this.addUserForm.controls['title_' + [x.languageCode]].setValue(
              this.userData['title_' + [x.languageCode]]
            );
            this.addUserForm.controls[
              'description_' + [x.languageCode]
            ].setValue(this.userData['description_' + [x.languageCode]]);
            this.addUserForm.controls[
              'title_' + [x.languageCode]
            ].setValidators(Validators.required);
            this.addUserForm.controls[
              'title_' + [x.languageCode]
            ].updateValueAndValidity();
          }
        });

        const titleEn = this.userData.title_en;
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

  submitFaq(data: any) {
    console.log('submitFaq', data);
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    const langNametitle = {};
    const langNameDescription = {};
    // for(let i=0; i<this.langSelectors.length; i++){
    for (const i of this.langSelectors) {
      if (i.active === true) {
        langNametitle[i.languageCode] = data['title_' + i.languageCode];
        langNameDescription[i.languageCode] =
          data['description_' + i.languageCode];
      }
    }

    const lang = 'en';
    let datas;
    if (langNameDescription[lang] === '') {
      datas = {
        title: langNametitle,
      };
    } else {
      datas = {
        title: langNametitle,
        htmlContent: langNameDescription,
      };
    }

    console.log('00000000000000000000', datas);
    this.service.addFaqlist(datas, this.sCatId).subscribe(
      (res: any) => {
        this.location.back();
        console.log('*********addFaqlist********', res);
      },
      error => {
        console.log(error);
      }
    );
    // const cat = {
    //   userType: 1,
    //   hasScat: this.sCatId !== '1' ? true : this.hasScat,
    //   supportTextId: this.supportTextId,
    //   subCatId: this.sCatId,
    // };
    // for (const prop in data) {
    //   if (data[prop]) {
    //     cat[prop] = data[prop];
    //   }
    // }

    // if (this.sCatId === this.supportTextId || this.sCatId === '1') {
    //   delete cat.supportTextId;
    //   delete cat.subCatId;
    // }

    // if (this.supportTextId !== '1') {
    //   cat.supportTextId = this.supportTextId;
    // }

    // console.log('cat', cat);
    // const id = this.supportTextId !== this.sCatId ? this.supportTextId : '';
    // console.log('id------------------>', id, cat);
    // this.service.addSupportUserList(cat, id).subscribe(
    //   (res: any) => {
    //     this.location.back();
    //     console.log(res);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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
