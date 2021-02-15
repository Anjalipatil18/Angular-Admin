import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { SupportTextService } from '../../../service/support-text.service';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.scss'],
})
export class UserCategoryComponent implements OnInit {
  userCat: any;
  userCatData: any = [];
  userCatSearch: any;
  columns: any;

  constructor(
    private service: SupportTextService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.getAllcat();
  }

  getAllcat() {
    this.service.supportTextUserList(1).subscribe(
      (res: any) => {
        console.log('supportText/userType=1', res);
        this.userCat = res.result;
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
        if (data.category.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.userCatSearch.push(data);
        }
      });
      this.userCatData = this.userCatSearch;
    } else {
      console.log('else');
    }
  }

  editSubCat(count, id) {
    if (count >= 0) {
      this.router.navigate([
        './pages/text-settings/support-text/user/UserSubCategory',
        id,
      ]);
    }
  }

  openDialog(id, index) {
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: 'Delete',
          content: 'Are you sure you want to delete it ?',
          ok: 'Delete it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        if (res) {
          this.deleteCat(id, index);
        }
      });
  }

  deleteCat(id, index) {
    this.userCat.splice(index, 1);
    this.userCat = [...this.userCat];
    const list = {
      id,
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
