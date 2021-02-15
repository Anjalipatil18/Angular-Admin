import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../service/models.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsPageComponent implements OnInit {
  constructor(
    private service: ModelsService,
    private route: ActivatedRoute,
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private dialogService: NbDialogService
  ) {}

  userActiveData: any = [];
  userActiveSearch: any;
  userActive: any;
  columns: any;
  likeId: any;
  status: any;

  limit = 10;
  totRecords: any;
  paginationIndex = 0;
  statusId: any = [];
  modelName: any;
  langSelectors = [];
  listLang: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('---params-models--===>', params);
      this.modelName = params.name;
      this.likeId = params.id;
      this.status = params.status;
      this.getAllModels();
      const breadcrumb = { AddtagT: params.name };
      this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
    });
    this.languageActive();
  }
  languageActive() {
    this.service.languageActive().subscribe(
      (res: any) => {
        this.listLang = res.result;
        this.listLang.map(x => {
          this.langSelectors.push({
            languageCode: x.languageCode,
            language: x.language,
            active: false,
          });
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  // change the status of models
  reportCheckbox(event, id) {
    if (event.target.checked) {
      this.statusId.push(id);
    } else {
      const index = this.statusId.findIndex(x => x === id);
      if (index > -1) {
        this.statusId.splice(index, 1);
      }
    }
    console.log('models selected---->', this.statusId);
  }

  // modal open for selected models
  deleteModels(status) {
    const titles = status === 4 ? 'Deactivate' : 'Activate';
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
        if (res) {
          this.usersDelete(status);
        }
      });
  }

  //  models status change api
  usersDelete(status) {
    // let list = {
    //   id: this.likeId,
    //   modelNames: this.statusId,
    //   modelStatus: status == 4 ? "deactivate" : "activate"
    // };

    const model = { name: {} };

    const modelsSelected = [];
    this.statusId.map((data, index) => {
      const modelIds = this.userActive.findIndex(arr => arr._id === data);
      // modelsSelected.push({
      model.name = this.userActive[modelIds].name;
      // });
    });
    const list = {
      modelIds: this.statusId,
      model,
      modelStatus: status === 4 ? 'deactivate' : 'activate',
    };
    console.log('change status data for models ', list);
    // modelsPostList(
    // modelsStatusUpdate
    this.service.modelsPostList(list, this.likeId).subscribe(
      (res: any) => {
        this.statusId = [];
        this.userActive = [];
        this.getAllModels();
        console.log('deleteAssets', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllModels(event?) {
    const list = {
      set: event && event.page ? event.page - 1 : 0,
      limit: this.limit,
      status: this.status === '1' ? 'active' : 'inactive',
      id: this.likeId,
    };
    console.log('list before api ', list);
    this.service.modelsList(list).subscribe(
      (res: any) => {
        console.log('get all brands & models data', res.data[0].models);
        this.userActive = res.data[0].models;
        this.totRecords = res.data[0].models.length;
        console.log('models data', this.userActive);
        // if(res.data[0]){
        // this.userActive = res.data[0].likedUsers;
        // }
      },
      error => {
        console.log(error);
      }
    );
    // this.service.modelsLikesList(list).subscribe(
    //   (res: any) => {
    //     console.log('like/type/id',res.data[0])
    //     if(res.data[0]){
    //     this.userActive = res.data[0].likedUsers;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  searchVerifiedActive(value) {
    this.userActiveSearch = [];
    this.userActiveData = [];
    if (value && this.userActive && this.userActive.length > 0) {
      this.userActiveData = this.userActive;
      this.userActiveData.map(data => {
        if (
          data.name &&
          data.name.en.toUpperCase().indexOf(value.toUpperCase()) > -1
        ) {
          this.userActiveSearch.push(data);
        }
      });
      this.userActiveData = this.userActiveSearch;
    } else {
      console.log('else');
    }
  }

  // for status make first letter for uppercase
  getUpperCase(val) {
    return val.slice(0, 1).toUpperCase() + val.slice(1);
  }
}
