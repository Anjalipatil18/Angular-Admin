import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { FaqService } from '../../../service/faq.service';

@Component({
  selector: 'app-user-category',
  templateUrl: './faq-category.component.html',
  styleUrls: ['./faq-category.component.scss'],
})
export class FaqCategoryComponent implements OnInit {
  userCat: any;
  userCatData: any = [];
  userCatSearch: any;
  columns: any;
  statusId: any = [];

  constructor(
    private service: FaqService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.getAllcat();
  }

  getAllcat() {
    this.service.getFaqList().subscribe(
      (res: any) => {
        this.userCat = res.data;
        console.log('this.userCat---->', this.userCat);
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

  editSubCat(count, id, title) {
    if (count >= 0) {
      this.router.navigate([
        './pages/text-settings/faq/faq-data/faq-subcategory',
        id,
        title,
      ]);
    }
  }

  reportCheckbox(event, id) {
    console.log(event, id);
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
  }

  faqDelete(status) {
    console.log(status);
    const list = {
      faqIds: this.statusId,
    };
    // console.log(list)
    this.service.deleteFaqList(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userCat = [];
        this.getAllcat();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCat(status) {
    const titles = status === 4 ? 'Delete' : 'Suspend';
    this.dialogService
      .open(DialogContentComponent, {
        context: {
          action: false,
          title: titles,

          content: 'Are you sure you want to ' + titles + ' it ?',
          ok: titles + ' it !!',
          cancelT: 'Cancel it !!',
        },
      })
      .onClose.subscribe(res => {
        // console.log(res)
        if (res) {
          this.faqDelete(titles);
        }
      });
  }

  // openDialog(id, index) {
  //   this.dialogService
  //     .open(DialogContentComponent, {
  //       context: {
  //         action: false,
  //         title: 'Delete',
  //         content: 'Are you sure you want to delete it ?',
  //         ok: 'Delete it !!',
  //         cancelT: 'Cancel it !!',
  //       },
  //     })
  //     .onClose.subscribe(res => {
  //       if (res) {
  //         this.deleteCat(id, index)
  //       }
  //     })
  // }

  // deleteCat(id, index) {
  //   this.userCat.splice(index, 1)
  //   this.userCat = [...this.userCat]
  //   const list = {
  //     id,
  //     deleteStatus: 2,
  //   }
  //   this.service.deleteSupportTextAction(list).subscribe(
  //     (res: any) => {
  //       console.log('supportTextAction', res)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
}
