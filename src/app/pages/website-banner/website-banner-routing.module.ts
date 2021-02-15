import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteBannerTabComponent } from './components/website-banner-tab/website-banners.component';
import { BannerAddComponent } from './components/inner-page/website-banner-add/website-banner-add.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteBannerTabComponent,
    data: {
      title: 'Website Banner',
      breadcrumb: [
        {
          label: 'Website Banner',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-editUpdate/:id',
    component: SellerEditViewComponent,
    data: {
      title: 'Seller Edit View',
      breadcrumb: [
        {
          label: 'Website Banner',
          url: 'website-banner',
        },
        {
          label: 'Edit',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add-city/:sCode/:id',
    component: BannerAddComponent,
    data: {
      title: 'Add Banner',
      breadcrumb: [
        {
          label: 'Banner',
          url: 'website-banner',
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
export class CountryRoutingModule {}
