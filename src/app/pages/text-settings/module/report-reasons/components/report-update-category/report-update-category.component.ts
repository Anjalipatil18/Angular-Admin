import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { ReportReasonsService } from '../service/report-reasons.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/global/global-config';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-report-update-category',
  templateUrl: './report-update-category.component.html',
  styleUrls: ['./report-update-category.component.scss'],
})
export class ReportUpdateCategoryComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;
  reasonId: any;
  resEdit: any;
  typeUser: any;
  listLang: any;
  langSelectors = [];
  formObj = {};

  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: ReportReasonsService,
    private conf: Configuration,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reasonId = params.id;
      this.typeUser = params.typeId;
      const title = this.reasonId === '1' ? 'Add Reason' : 'Edit Reason';
      const breadcrumb = { rTitle: title };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
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
          this.formObj[x.languageCode] = new FormControl('');
        });
        this.reasonaddForm();
        const index = this.langSelectors.findIndex(
          x => x.languageCode === 'en'
        );
        if (index > -1) {
          this.langSelectors[index].active = true;
          this.addUserForm.controls[
            this.langSelectors[index].languageCode
          ].setValidators(Validators.required);
          this.addUserForm.controls[
            this.langSelectors[index].languageCode
          ].updateValueAndValidity();
        }

        if (this.reasonId !== '1') {
          this.getEditSupportText();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  reasonaddForm() {
    // console.log(this.formObj);
    this.addUserForm = this.formBuilder.group(this.formObj);
  }

  reportCheckbox(event, i, lang) {
    this.langSelectors[i].active = event.target.checked;
    if (event.target.checked) {
      this.addUserForm.controls[lang].setValidators(Validators.required);
      this.addUserForm.controls[lang].updateValueAndValidity();
    } else {
      this.addUserForm.controls[lang].setValidators(null);
      this.addUserForm.controls[lang].updateValueAndValidity();
      this.addUserForm.controls[lang].setValue('');
    }
    // console.log('thisadduserform', this.addUserForm);
  }

  getEditSupportText() {
    this.service.reportReasons(this.typeUser, this.reasonId).subscribe(
      (res: any) => {
        console.log('reportReasons/userType=1/id', res);
        this.resEdit = res.result[0].reason;
        for (const prop in this.resEdit) {
          if (this.resEdit[prop]) {
            const index = this.langSelectors.findIndex(
              x => x.languageCode === prop
            );
            this.langSelectors[index].active = true;
            this.addUserForm.get(prop).setValue(this.resEdit[prop]);
            this.addUserForm.get(prop).setValidators(Validators.required);
            this.addUserForm.get(prop).updateValueAndValidity();
          }
        }
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
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    const cat = {};
    for (const prop in data) {
      if (data[prop]) {
        cat[prop] = data[prop];
      }
    }

    const list = {
      reportReasonId: this.reasonId,
      userType: this.typeUser,
      reason: cat,
    };

    if (this.reasonId === '1') {
      delete list.reportReasonId;
    }

    // console.log(list);
    this.service.reportUpdateReasons(list, this.reasonId).subscribe(
      (res: any) => {
        this.conf.setItem('reportType', this.typeUser);
        this.location.back();

        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    this.location.back();
  }
}
