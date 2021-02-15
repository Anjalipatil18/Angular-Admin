import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from './../../../../../ui-features/dialog-content/dialog-content.component';
import { Configuration } from '../../../../../../global/global-config';
import { LanguageService } from '../../service/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lan-disabled',
  templateUrl: './lan-disabled.component.html',
  styleUrls: ['./lan-disabled.component.scss'],
})
export class LanDisabledComponent implements OnInit {
  @ViewChild('table', { static: true }) table;
  @Output() listTable = new EventEmitter<any>();
  @Input()
  set allDataList(allDataList: any) {
    // console.log(allDataList);
    const val =
      allDataList && allDataList.data === 1 ? this.getAlllanguage() : '';
  }

  language: any;
  languageSearch = [];
  languageData = [];
  columns: any;

  constructor(
    private service: LanguageService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private conf: Configuration,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAlllanguage();
  }

  // get active language
  getAlllanguage() {
    this.service.language().subscribe(
      (res: any) => {
        console.log('languageAPI/status-2', res);
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
      // console.log("else");
    }
  }

  deleteTax(id, index) {
    this.language.splice(index, 1);
    this.language = [...this.language];
    this.conf.setItem('cityId', id);
    this.conf.setItem('deleteStatus', 1);
    this.service.updateCity().subscribe(
      (res: any) => {
        this.conf.removeItem('cityId');
        this.conf.removeItem('deleteStatus');
        console.log('deletelanguageAPI', res);
        this.listTable.emit(2);
        // this.router.navigate(['./pages']);
      },
      error => {
        console.log(error);
      }
    );
  }

  addLang(id, index) {
    this.language.splice(index, 1);
    this.language = [...this.language];
    this.service.addorDeleteLang(id, 1).subscribe(
      (res: any) => {
        console.log('languageActionAPI', res);
        this.listTable.emit(2);
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(id, index) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'Enabled',
          content: 'Are you sure you want to enable it ?',
          ok: 'Yes, enable it !!',
          cancelT: 'No, cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.addLang(id, index);
        }
      });
  }
}
