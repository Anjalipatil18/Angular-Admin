import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssetTypeService } from '../../service/asset-type.service';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TypedetailsDialogComponent } from '../typedetails-dialog/typedetails-dialog.component';
import { DialogContentComponent } from 'src/app/pages/ui-features/dialog-content/dialog-content.component';
import { Ng7DynamicBreadcrumbService } from 'ng7-dynamic-breadcrumb';

@Component({
  selector: 'app-attribute-drag-drop',
  templateUrl: './attribute-drag-drop.component.html',
  styleUrls: ['./attribute-drag-drop.component.scss'],
})
export class AttributeDragDropComponent implements OnInit {
  constructor(
    private breadCrumb: Ng7DynamicBreadcrumbService,
    private service: AssetTypeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  dragSearch: any;
  dragData: any;
  attributesGroupIds = [];
  artists = [];
  alteArtists = [];
  trigger: any;
  assetTypeId: any;
  dragDrop = false;

  statusId: any = [];
  userActive: any;
  columns: any;
  aciveGroupSearch: any = [];
  aciveGroupData: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.trigger = params.trId;
      this.assetTypeId = params.aTypeId;
    });
    this.getEditSupportText();
  }

  getEditSupportText() {
    this.service.editAssetTypeList(this.trigger, this.assetTypeId).subscribe(
      (res: any) => {
        console.log('res', res);
        this.getAllAttributeGroup();
        console.log('assetTypesInfo/triggerId/id', res);
        res.result[0].attributesGroup.sort((a, b) => a.seqId - b.seqId);
        this.userActive = res.result[0].attributesGroup;
        this.aciveGroupData = res.result[0].attributesGroup;
        this.alteArtists = res.result[0].attributesGroup;
        const breadcrumb = {
          titleGroup: res.result[0].title_en,
          titleId: res.result[0].id,
        };
        this.breadCrumb.updateBreadcrumbLabels(breadcrumb);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchGroupUser(value) {
    this.aciveGroupSearch = [];
    if (value && this.aciveGroupData && this.aciveGroupData.length > 0) {
      this.aciveGroupData.map(data => {
        if (data.title.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.aciveGroupSearch.push(data);
        }
      });
      this.userActive = this.aciveGroupSearch;
    } else {
      this.userActive = this.aciveGroupData;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event.previousContainer, event.container)
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // moveItemInArray(this.artists, event.previousIndex, event.currentIndex);
    }

    // console.log(event)
    this.attributesGroupIds = [];
    this.alteArtists.map(x => {
      const index = this.attributesGroupIds.findIndex(y => y === x.id);
      if (index === -1) {
        this.attributesGroupIds = [...this.attributesGroupIds, x.id];
      }
    });
    console.log(this.alteArtists);
  }

  getAllAttributeGroup() {
    const list = {
      set: 0,
      limit: 10,
      status: 1,
    };
    this.service.attributeGroupList(list).subscribe(
      (res: any) => {
        console.log('attributesGroup/1', res);
        this.aciveGroupData.map(y => {
          const index = res.result.findIndex(x => x.id === y.id);
          res.result.splice(index, 1);
        });
        this.artists = res.result;
        this.dragData = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchGroup(value) {
    this.dragSearch = [];
    // this.dragData = [];
    if (value && this.dragData && this.dragData.length > 0) {
      this.dragData.map(data => {
        if (data.title.en.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          this.dragSearch.push(data);
        }
      });
      this.artists = this.dragSearch;
    } else {
      this.artists = this.dragData;
    }
  }

  addAttributeGroup() {
    const list = {
      trigger: this.trigger,
      attributesGroupIds: this.attributesGroupIds,
      assetTypeId: this.assetTypeId,
    };
    this.service.addAttributeGroups(list).subscribe(
      (res: any) => {
        console.log('assetTypesAddAttributeGroups/id', res);
        // this.location.back();
        this.dragDrop = false;
        this.alteArtists = [];
        this.userActive = [];
        this.aciveGroupData = [];
        this.getEditSupportText();
      },
      error => {
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
    // console.log(this.statusId);
  }

  reOrder(index, status) {
    // console.log(index, status)
    const list = {
      up: {
        id:
          status === '0'
            ? this.userActive[index].id
            : this.userActive[index + 1].id,
        seqId:
          status === '0'
            ? this.userActive[index - 1].seqId
            : this.userActive[index].seqId,
      },
      down: {
        id:
          status === '1'
            ? this.userActive[index].id
            : this.userActive[index - 1].id,
        seqId:
          status === '1'
            ? this.userActive[index + 1].seqId
            : this.userActive[index].seqId,
      },
      trigger: this.trigger,
      assetTypeId: this.assetTypeId,
    };
    console.log(list);
    this.service.getAssetTypeDragOrder(list).subscribe(
      (res: any) => {
        console.log('assetTypeAttributesGroupListChangeOrder/id', res);
        this.userActive = [];
        this.aciveGroupData = [];
        this.getEditSupportText();
      },
      error => {
        console.log(error);
      }
    );
  }

  usersDelete(status) {
    const list = {
      deleteStatus: status,
      id: this.statusId,
      trigger: this.trigger,
      assetTypeId: this.assetTypeId,
    };
    console.log(list);
    this.service.deleteAttrList(list).subscribe(
      (res: any) => {
        this.alteArtists = [];
        this.userActive = [];
        this.aciveGroupData = [];
        this.statusId = [];
        this.getEditSupportText();
        console.log('deleteAssetTypeAttrList', res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteType(status) {
    const titles = status === 1 ? 'Activate' : 'Delete';
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
        console.log(res);
        if (res) {
          this.usersDelete(status);
        }
      });
  }

  openDialog(data) {
    console.log(data);
    this.dialogService
      .open(TypedetailsDialogComponent, {
        context: {
          action: false,
          title: 'Atrribute Group Details',
          content: data,
          ok: 'Submit',
          cancelT: 'Cancel',
        },
      })
      .onClose.subscribe(res => {
        console.log(res);
      });
  }
}
