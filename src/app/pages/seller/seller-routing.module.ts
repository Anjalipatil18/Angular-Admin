import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerViewsComponent } from './components/inner-page/seller-views/seller-views.component';
import { SellerLikesComponent } from './components/inner-page/seller-likes/seller-likes.component';
import { SellerAddComponent } from './components/inner-page/seller-add/seller-add.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';
import { SellerUserdetailsComponent } from './components/inner-page/seller-userdetails/seller-userdetails.component';
import { SellerCommentsComponent } from './components/inner-page/seller-comments/seller-comments.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    data: {
      title: 'Seller',
      breadcrumb: [
        {
          label: 'Seller',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-views',
    component: SellerViewsComponent,
    data: {
      title: 'Seller View',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-likes/:name/:id',
    component: SellerLikesComponent,
    data: {
      title: 'Seller Referrals',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
        },
        {
          label: '{{AddtagT}} Referrals',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-comments/:id',
    component: SellerCommentsComponent,
    data: {
      title: 'Seller Comments',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
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
    component: SellerUserdetailsComponent,
    data: {
      title: 'Seller User Details',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-update/:sCode/:id',
    component: SellerAddComponent,
    data: {
      title: 'Seller Update',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
        },
        {
          label: 'Add',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-editUpdate/:statusType/:sCode/:id',
    component: SellerEditViewComponent,
    data: {
      title: 'Seller Edit View',
      breadcrumb: [
        {
          label: 'Seller',
          url: 'seller',
        },
        {
          label: 'Edit',
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
export class SellerRoutingModule {}
