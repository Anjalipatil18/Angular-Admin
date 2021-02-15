import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxesComponent } from './taxes.component';
import { TaxesViewsComponent } from './components/inner-page/taxes-views/taxes-views.component';
import { TaxesLikesComponent } from './components/inner-page/taxes-likes/taxes-likes.component';
import { TaxesAddComponent } from './components/inner-page/taxes-add/taxes-add.component';
import { TaxesUserdetailsComponent } from './components/inner-page/taxes-userdetails/taxes-userdetails.component';
import { TaxesCommentsComponent } from './components/inner-page/taxes-comments/taxes-comments.component';

const routes: Routes = [
  {
    path: '',
    component: TaxesComponent,
    data: {
      title: 'Taxes',
      breadcrumb: [
        {
          label: 'Taxes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-views',
    component: TaxesViewsComponent,
    data: {
      title: 'Ads View',
      breadcrumb: [
        {
          label: 'Taxes',
          url: 'taxes',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-likes/:id',
    component: TaxesLikesComponent,
    data: {
      title: 'Ads Likes',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: 'Likes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-comments/:id',
    component: TaxesCommentsComponent,
    data: {
      title: 'Ads Comments',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
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
    component: TaxesUserdetailsComponent,
    data: {
      title: 'Ads User Details',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-update/:sCode/:id',
    component: TaxesAddComponent,
    data: {
      title: 'Taxes Update',
      breadcrumb: [
        {
          label: 'Taxes',
          url: 'taxes',
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
export class TaxesRoutingModule {}
