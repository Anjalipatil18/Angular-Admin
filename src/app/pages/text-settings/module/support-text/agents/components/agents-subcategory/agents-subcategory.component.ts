import { Component, OnInit } from '@angular/core';
import { SupportTextService } from '../../../service/support-text.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-agents-subcategory',
  templateUrl: './agents-subcategory.component.html',
  styleUrls: ['./agents-subcategory.component.scss'],
})
export class AgentsSubcategoryComponent implements OnInit {
  userCat: any;
  userCatData: any = [];
  userCatSearch: any;
  columns: any;
  catId: any;

  constructor(
    private service: SupportTextService,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.catId = params.id;
      this.getAllcat();
    });
  }

  getAllcat() {
    this.service.supportTextUserList(2, this.catId).subscribe(
      (res: any) => {
        console.log('supportText/userType=1/sCatId', res);
        this.userCat = res.result[0].sub_cat;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchSupportText(value) {
    this.userCatSearch = [];
    this.userCatData = [];
    if (value && this.userCat && this.userCat.length > 0) {
      this.userCatData = this.userCat;
      this.userCatData.map(data => {
        if (data.name.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.userCatSearch.push(data);
        }
      });
      this.userCatData = this.userCatSearch;
    } else {
      console.log('else');
    }
  }

  back() {
    this.location.back();
  }

  openDialog(id, index) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'Delete',
          content: 'Are you sure you want to delete it ?',
          ok: 'Yes, disable it !!',
          cancelT: 'No, cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.deleteSubCat(id, index);
        }
      });
  }

  deleteSubCat(id, index) {
    this.userCat.splice(index, 1);
    this.userCat = [...this.userCat];
    const list = {
      id: this.catId,
      subCatId: id,
      deleteStatus: 2,
    };
    this.service.deleteSupportTextAction(list).subscribe(
      (res: any) => {
        console.log('supportTextAction', res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
