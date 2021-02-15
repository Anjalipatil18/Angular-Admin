import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

import { Configuration } from 'src/app/global/global-config';
import { LanguageService } from '../../service/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lan-enabled',
  templateUrl: './lan-enabled.component.html',
  styleUrls: ['./lan-enabled.component.scss'],
})
export class LanEnabledComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    const val =
      allDataList && allDataList.data === 2 ? this.getAllLanguage() : '';
  }

  language: any;
  languageSearch = [];
  languageData = [];
  listLanguage: any;
  columns: any;

  constructor(
    private service: LanguageService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private conf: Configuration,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllLanguage();
    this.getAllLanguageList();
  }

  getAllLanguageList() {
    this.service.languageList().subscribe(
      (res: any) => {
        console.log('languageListAPI', res);
        this.listLanguage = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  // get enabled language
  getAllLanguage() {
    this.service.language().subscribe(
      (res: any) => {
        console.log('language', res);
        this.language = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  // search in active language
  searchlanguageActive(value) {
    this.languageSearch = [];
    this.languageData = [];
    if (value && this.language && this.language.length > 0) {
      this.languageData = this.language;
      this.languageData.map(data => {
        if (data.language.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.languageSearch.push(data);
        }
      });
      this.languageData = this.languageSearch;
    } else {
      console.log('else');
    }
  }

  deleteLang(id, index, statUs) {
    let status;
    if (statUs === '100') {
      status = statUs;
      this.language.splice(index, 1);
      this.language = [...this.language];
    } else {
      status = statUs === 1 ? 2 : 1;
      this.language[index].status = status;
    }
    this.service.addorDeleteLang(id, status).subscribe(
      (res: any) => {
        console.log('languageActionAPI', res);
        // this.getAllLanguage();
        // this.listTable.emit(1);
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(id, index, status) {
    const statUsText =
      status === 2 ? 'Enable' : status === '100' ? 'Delete' : 'Disable';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: statUsText,
          content: 'Are you sure you want to ' + statUsText + ' it ?',
          ok: statUsText + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.deleteLang(id, index, status);
        }
      });
  }

  addDialog() {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: true,
          title: 'Language',
          content: this.listLanguage,
          ok: 'Add',
          cancelT: 'Close',
          language: true,
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.addLang(res);
        }
      });
  }

  addLang(lang) {
    this.service.languageAdd(lang).subscribe(
      (res: any) => {
        console.log('languageAddAPI', res);
        this.getAllLanguage();
      },
      error => {
        console.log(error);
      }
    );
  }
}
