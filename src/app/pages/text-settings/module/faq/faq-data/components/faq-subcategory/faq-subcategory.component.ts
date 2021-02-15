import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../service/faq.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-user-subcategory',
  templateUrl: './faq-subcategory.component.html',
  styleUrls: ['./faq-subcategory.component.scss'],
})
export class FaqSubcategoryComponent implements OnInit {
  userCat: any;
  userCatData: any = [];
  userCatSearch: any;
  columns: any;
  catId: any;
  statusId: any = [];
  constructor(
    private service: FaqService,
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: NbDialogService,
    private breadcrumb: Ng7DynamicBreadcrumbService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.catId = params.id;
      console.log('sub category------->', this.catId);
      this.getAllcat();
    });
  }

  getAllcat() {
    const list = {
      id: this.catId,
    };
    this.service.getfaqEditData(list).subscribe((res: any) => {
      console.log('sub points **********', res);
      this.userCat = res.data;
    });
    // this.service.getFaqList().subscribe(
    //   (res: any) => {
    //     console.log('supportText/userType=1/sCatId------->', res)
    //     this.userCat = res.result[0].sub_cat;
    //     const breadcrumb = { catTitle: res.result[0].category_en }
    //     this.breadcrumb.updateBreadcrumbLabels(breadcrumb)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
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
}
