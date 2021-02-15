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

@Component({
  selector: 'app-agents-updatecategory',
  templateUrl: './agents-updatecategory.component.html',
  styleUrls: ['./agents-updatecategory.component.scss'],
})
export class AgentsUpdatecategoryComponent implements OnInit {
  public Editor = ClassicEditor;

  addUserForm: FormGroup;
  userDataFrench = false;
  hasScat = false;
  submitted = false;
  supportTextId: any;
  sCatId: any;
  userCatList: any;
  resEdit: any;

  constructor(
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
      // console.log(taxId);
      if (this.supportTextId !== this.sCatId) {
        this.getEditSupportText();
      }
    });
    this.taxaddForm();
  }

  getEditSupportText() {
    this.service.supportTextUserList(2, this.supportTextId).subscribe(
      (res: any) => {
        console.log('supportText/userType=1/id', res);
        if (this.sCatId !== '1') {
          res.result[0].sub_cat.forEach(x => {
            if (x.subCatId === this.sCatId) {
              this.resEdit = x;
              console.log(x);
            }
          });
        } else {
          this.resEdit = res.result[0];
          this.hasScat = this.resEdit.hasScat;
        }
        if (this.resEdit.name.hi) {
          this.userDataFrench = true;
        }
        this.addUserForm.get('catgoryEng').setValue(this.resEdit.name.en);
        this.addUserForm.get('catgoryFr').setValue(this.resEdit.name.hi);
        this.addUserForm
          .get('desEng')
          .setValue(
            this.resEdit.description.en ? this.resEdit.description.en : ''
          );
        this.addUserForm
          .get('desFr')
          .setValue(
            this.resEdit.description.hi ? this.resEdit.description.hi : ''
          );
      },
      error => {
        console.log(error);
      }
    );
  }

  taxaddForm() {
    this.addUserForm = new FormGroup({
      catgoryEng: new FormControl('', [Validators.required]),
      catgoryFr: new FormControl(''),
      desEng: new FormControl(''),
      desFr: new FormControl(''),
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  getUsers(data: any) {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    const list = {
      userType: 2,
      hasScat: this.sCatId !== 1 ? true : this.hasScat,
      supportTextId: this.supportTextId,
      subCatId: this.sCatId,
      category: {
        en: data.catgoryEng,
        hi: this.userDataFrench ? data.catgoryFr : '',
      },
      description: {
        en: data.desEng,
        hi: this.userDataFrench ? data.desFr : '',
      },
    };

    if (this.sCatId === this.supportTextId || this.sCatId === 1) {
      delete list.supportTextId;
      delete list.subCatId;
    }

    if (this.supportTextId !== 1) {
      list.supportTextId = this.supportTextId;
    }

    console.log(list);
    const id = this.supportTextId !== this.sCatId ? this.supportTextId : '';
    this.service.addSupportUserList(list, id).subscribe(
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
    this.hasScat = event.target.checked;
  }

  back() {
    this.location.back();
  }
}
