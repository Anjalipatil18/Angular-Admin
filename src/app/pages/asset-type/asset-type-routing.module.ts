import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetTypeComponent } from './asset-type.component';
import { SubTypeComponent } from './components/inner-page/sub-type/sub-type.component';
import { SubSubTypeComponent } from './components/inner-page/sub-sub-type/sub-sub-type.component';
import { UpdateSubTypeComponent } from './components/inner-page/update-sub-type/update-sub-type.component';
import { AttributeDragDropComponent } from './components/inner-page/attribute-drag-drop/attribute-drag-drop.component';

const routes: Routes = [
  {
    path: '',
    component: AssetTypeComponent,
    data: {
      title: 'Asset Type',
      breadcrumb: [
        {
          label: 'Asset Types',
          url: '',
        },
      ],
    },
  },
  {
    path: 'subType/sub-type/:assetTypeName/:assetTypeId/:id',
    component: SubSubTypeComponent,
    data: {
      title: 'Asset Types',
      breadcrumb: [
        {
          label: 'Asset Type ({{assetTypeName}})',
          url: 'asset-type',
        },
        {
          label: 'Sub Type ({{assetSubTypetitle}})',
          url: '/pages/asset-type/sub-type/:assetTypeId',
        },
        {
          label: 'Sub Sub Type',
          url: '',
        },
      ],
    },
  },
  {
    path: 'drag-drop/:trId/:aTypeId',
    component: AttributeDragDropComponent,
    data: {
      title: 'Drag Drop',
      breadcrumb: [
        {
          label: 'Asset Type',
          url: 'asset-type',
        },
        {
          label: 'Attribute Group ({{titleGroup}})',
          url: '/pages/asset-type/drag-drop/:trId/:aTypeId',
        },
        {
          label: 'Drag Drop',
          url: '',
        },
      ],
    },
  },
  {
    path: 'updateType/:id/:sId/:tId',
    component: UpdateSubTypeComponent,
    data: {
      title: 'Asset Type',
      breadcrumb: [
        {
          label: 'Asset Types',
          url: 'asset-type',
        },
        {
          label: '{{subTypeT}}',
          url: 'asset-type',
        },
        {
          label: '{{subTypeE}}',
          url: '',
        },
      ],
    },
  },
  {
    path: 'sub-type/:id',
    component: SubTypeComponent,
    data: {
      title: 'Asset Type',
      breadcrumb: [
        {
          label: 'Asset Type ({{assetType}})',
          url: 'asset-type',
        },
        {
          label: 'Sub Type',
          url: '',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetTypeRoutingModule {}
