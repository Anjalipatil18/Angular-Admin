import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitsComponent } from './units.component';
// import { TaxesViewsComponent } from './components/inner-page/units-views/taxes-views.component';
// import { TaxesLikesComponent } from './components/inner-page/units-likes/taxes-likes.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';
import { UnitsAddComponent } from './components/inner-page/units-add/units-add.component';
// import { TaxesUserdetailsComponent } from './components/inner-page/units-userdetails/taxes-userdetails.component';
// import { TaxesCommentsComponent } from './components/inner-page/units-comments/taxes-comments.component';

const routes: Routes = [
  {
    path: '',
    component: UnitsComponent,
    data: {
      title: 'Units',
      breadcrumb: [
        {
          label: 'Units',
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
          label: 'Units',
          url: 'units',
        },
        {
          label: 'Edit',
          url: '',
        },
      ],
    },
  },

  {
    path: 'ads-update/:sCode/:id',
    component: UnitsAddComponent,
    data: {
      title: 'Units Update',
      breadcrumb: [
        {
          label: 'Units',
          url: 'units',
        },
        {
          label: 'Add',
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
export class UnitsRoutingModule {}
