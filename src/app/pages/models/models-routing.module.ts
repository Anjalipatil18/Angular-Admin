import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelsComponent } from './models.component';
import { ModelsViewsComponent } from './components/inner-page/models-views/models-views.component';
import { ModelsPageComponent } from './components/inner-page/models/models.component';
import { ModelsAddComponent } from './components/inner-page/models-add/models-add.component';
import { ModelsUserdetailsComponent } from './components/inner-page/models-userdetails/models-userdetails.component';
import { ModelsCommentsComponent } from './components/inner-page/models-comments/models-comments.component';
import { ReviewModelsComponent } from './components/inner-page/review-models/review-models.component';
import { AddModelsComponent } from './components/inner-page/add-models/models-add.component';

const routes: Routes = [
  {
    path: '',
    component: ModelsComponent,
    data: {
      title: 'Models',
      breadcrumb: [
        {
          label: 'Brands',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-views',
    component: ModelsViewsComponent,
    data: {
      title: 'Ads View',
      breadcrumb: [
        {
          label: 'Models',
          url: 'models',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'product-models/:name/:id/:status',
    component: ModelsPageComponent,
    data: {
      title: 'Product Models',
      breadcrumb: [
        {
          label: 'Brands',
          url: 'models',
        },
        {
          label: '{{AddtagT}} models',
          url: '',
        },
      ],
    },
  },
  {
    path: 'product-review-models/:name/:id',
    component: ReviewModelsComponent,
    data: {
      title: 'Product Models',
      breadcrumb: [
        {
          label: 'Models',
          url: 'models',
        },
        {
          label: '{{AddtagT}} models',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-comments/:statusText/:add/:id',
    component: ModelsCommentsComponent,
    data: {
      title: 'Ads Comments',
      breadcrumb: [
        {
          label: 'Models Update',
          url: 'models',
        },
        {
          label: 'Comments',
          url: '',
        },
      ],
    },
  },
  {
    path: 'user-details/:sCode/:id',
    component: ModelsUserdetailsComponent,
    data: {
      title: 'Ads User Details',
      breadcrumb: [
        {
          label: 'Models',
          url: 'models',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'models-update/:statusText/:sCode/:id',
    component: ModelsAddComponent,
    data: {
      title: 'Models Update',
      breadcrumb: [
        {
          label: 'Brands',
          url: 'models',
        },
        {
          label: '{{AddtagT}}',
          url: '',
        },
      ],
    },
  },
  {
    path: 'update-models/:name/:id/:status/:modelId',
    component: AddModelsComponent,
    data: {
      title: 'Models Update',
      breadcrumb: [
        {
          label: 'Product Models',
          url: 'models/product-models/:name/:id/:status',
        },
        {
          label: '{{AddtagT}}',
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
export class ModelsRoutingModule {}
