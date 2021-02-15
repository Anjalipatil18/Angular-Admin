import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotorsService } from '../../service/promotors.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Ng7DynamicBreadcrumbService } from '../../../../../../../node_modules/ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-productsharedclicklogs-dialog',
  templateUrl: './productsharedclicklogs-dialog.component.html',
  styleUrls: ['./productsharedclicklogs-dialog.component.scss'],
})
export class ProductSharedClickLogsDialogComponent implements OnInit {
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  userId: any;
  statusCode: any;
  numForTab: any;
  name: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: PromotorsService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(
        'params---------inner inner-------ngOnInit-------------promotors',
        params.subid
      );
      this.statusCode = params.sCode;
      this.userId = params.id;
      this.numForTab = params.num;
      this.name = params.name;
      console.log('////this.numForTab////', this.numForTab);
      this.showSharedDataPromotors(params.subid, this.userId);
    });

    const breadcrumb = { AddtagT: this.name };
    this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
  }

  back() {
    this.location.back();
  }

  showSharedDataPromotors(id, outerid) {
    this.service.sharedProductLogs(outerid).subscribe(
      (res: any) => {
        const indx = res.data.findIndex(val => val._id === id);
        if (this.numForTab === 2) {
          console.log('-----users click--------');
          this.userActive = res.data[indx].userClicks;
        } else if (this.numForTab === 1) {
          console.log('-----guest click--------');
          this.userActive = res.data[indx].guestClicks;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.firstName &&
          data.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
  }

  // @Input() action: boolean;
  // @Input() title: string;
  // @Input() content:any;
  // @Input() ok:string;
  // @Input() cancelT:string;

  // constructor(protected ref: NbDialogRef<productSharedClickLogsDialogComponent>) { }

  // reason:string='';

  // ngOnInit() {

  // }

  // cancel() {
  //   this.ref.close();
  // }

  // submit() {
  //   this.ref.close();
  // }
}
