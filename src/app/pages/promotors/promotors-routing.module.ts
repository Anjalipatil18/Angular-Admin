import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotorsComponent } from './promotors.component';
import { PromotorsViewsComponent } from './components/inner-page/promotors-views/promotors-views.component';
import { PromotorsLikesComponent } from './components/inner-page/promotors-likes/promotors-likes.component';
import { PromotorsAddComponent } from './components/inner-page/promotors-add/promotors-add.component';
import { PromotorsUserdetailsComponent } from './components/inner-page/promotors-userdetails/promotors-userdetails.component';
import { PromotorsCommentsComponent } from './components/inner-page/promotors-comments/promotors-comments.component';
import { PromotorsProductsSharedComponent } from './components/inner-page/promotors-productsShared/promotors-productsShared.component';
import { ProductSharedClickLogsDialogComponent } from './components/inner-page/productsharedclicklogs-dialog/productsharedclicklogs-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: PromotorsComponent,
    data: {
      title: 'Promoters',
      breadcrumb: [
        {
          label: 'Promoters',
          url: '',
        },
      ],
    },
  },
  {
    path: 'promoters-views',
    component: PromotorsViewsComponent,
    data: {
      title: 'Promoters View',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'promoters-likes/:name/:id',
    component: PromotorsLikesComponent,
    data: {
      title: 'Promoters Referrals',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
        },
        {
          label: '{{AddtagT}} Referrals',
          url: '',
        },
      ],
    },
  },
  {
    path: 'promoters-productsShared/:name/:id',
    component: PromotorsProductsSharedComponent,
    data: {
      title: 'Promoters Products Shared',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
        },
        {
          label: '{{AddtagT}} ProductsShared',
          url: '',
        },
      ],
    },
  },
  {
    path: 'promoters-clicklogs/:sCode/:id/:subid/:num/:name',
    component: ProductSharedClickLogsDialogComponent,
    data: {
      title: 'promoters click logs',
      breadcrumb: [
        {
          label: 'promoters-clicklogs',
          url: 'promoters/promoters-productsShared/:sCode/:id',
        },
        {
          label: '{{AddtagT}} Click logs',
          url: '',
        },
      ],
    },
  },

  {
    path: 'promoters-comments/:id',
    component: PromotorsCommentsComponent,
    data: {
      title: 'Promoters Comments',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
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
    component: PromotorsUserdetailsComponent,
    data: {
      title: 'Promoters User Details',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'promoters-update/:sCode/:id',
    component: PromotorsAddComponent,
    data: {
      title: 'Promoters Update',
      breadcrumb: [
        {
          label: 'Promoters',
          url: 'promoters',
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
export class PromotorsRoutingModule {}
