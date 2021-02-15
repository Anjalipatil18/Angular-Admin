import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { PromotionPlanService } from '../service/promotion-plan.service';
import { faTabletAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { DialogContentComponent } from '../../../../../app/pages/ui-features/dialog-content/dialog-content.component';
@Component({
  selector: 'app-deleted-promotion-plan',
  templateUrl: './deleted-promotion-plan.component.html',
  styleUrls: ['./deleted-promotion-plan.component.scss'],
})
export class DeletedPromotionPlanComponent implements OnInit {
  constructor(
    private service: PromotionPlanService,
    private dialogService: NbDialogService
  ) {}

  faMobileAlt = faMobileAlt;
  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  statusId: any = [];

  limit = 10;
  totRecords: any;
  paginationIndex = 0;

  @ViewChild('attributeSearchGroup', { static: true })
  attributeSearchGroup: ElementRef;
  ngOnInit() {
    fromEvent(this.attributeSearchGroup.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        console.log(text);
        if (text.length) {
          this.getAllTags('', '', text);
        } else {
          this.getAllTags();
        }
      });
    this.getAllTags();
  }

  getAllTags(event?, sortName?, searchKey?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'InActive',
      userId: '',
      searchedKey: searchKey ? searchKey : '',
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.purchasePlanList(list).subscribe(
      (res: any) => {
        console.log('purchasePlanList', res);
        this.totRecords = res.data.length;
        this.userActive = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchVerifiedActive(event, value) {
    this.userActiveSearch = [];
    this.userActiveData = [];

    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: 'InActive',
      userId: '',
      search: value,
    };
    this.paginationIndex = event && event.page ? event.page - 1 : 0;
    this.service.purchaseSearchPlanList(list, event).subscribe(
      (res: any) => {
        console.log('userActiveData search active **********', res);
        this.totRecords = res.data.length;
        this.userActiveData = res.data;
      },
      error => {
        this.userActive = [];
        console.log(error);
      }
    );
  }

  reportCheckbox(event, id) {
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
  }

  usersDelete(status) {
    console.log(status);
    const list = {
      promotionPlanId: this.statusId,
    };
    // console.log(list)
    this.service.permanentdeletePromotionPlan(list).subscribe(
      (res: any) => {
        // this.listTable.emit(3);
        this.statusId = [];
        this.userActive = [];
        this.getAllTags();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUnits(status) {
    const titles = status === 3 ? 'Permanent Delete' : 'Suspend';
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
          this.usersDelete(titles);
        }
      });
  }
}
