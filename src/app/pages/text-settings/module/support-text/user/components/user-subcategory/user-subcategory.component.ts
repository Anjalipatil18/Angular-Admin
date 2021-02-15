import { Component, OnInit } from '@angular/core';
import { SupportTextService } from '../../../service/support-text.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-user-subcategory',
  templateUrl: './user-subcategory.component.html',
  styleUrls: ['./user-subcategory.component.scss'],
})
export class UserSubcategoryComponent implements OnInit {
  userCat: any;
  userCatData: any = [];
  userCatSearch: any;
  columns: any;
  catId: any;

  constructor(
    private service: SupportTextService,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: NbDialogService,
    private breadcrumb: Ng7DynamicBreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.catId = params.id;
      this.getAllcat();
    });
  }

  getAllcat() {
    this.service.supportTextUserList(1, this.catId).subscribe(
      (res: any) => {
        console.log('supportText/userType=1/sCatId', res);
        this.userCat = res.result[0].sub_cat;
        const breadcrumb = { catTitle: res.result[0].category_en };
        this.breadcrumb.updateBreadcrumbLabels(breadcrumb);
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
        if (data.category_en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
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
          ok: 'Yes, Delete it !!',
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
