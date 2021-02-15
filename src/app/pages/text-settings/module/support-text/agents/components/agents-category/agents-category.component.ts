import { Component, OnInit } from '@angular/core';
import { SupportTextService } from '../../../service/support-text.service';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-agents-category',
  templateUrl: './agents-category.component.html',
  styleUrls: ['./agents-category.component.scss'],
})
export class AgentsCategoryComponent implements OnInit {
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
    this.service.supportTextUserList(2).subscribe(
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
        if (data.name.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
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
        './pages/text-settings/support-text/agents/AgentsSubCategory',
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
          ok: 'Yes, disable it !!',
          cancelT: 'No, cancel it !!',
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
