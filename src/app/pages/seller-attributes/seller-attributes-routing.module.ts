import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerAttributesComponent } from './seller-attributes.component';
import { UpdateAttributesComponent } from './components/update-attributes/update-attributes.component';

const routes: Routes = [
  {
    path: '',
    component: SellerAttributesComponent,
    data: {
      title: 'Seller Attributes',
      breadcrumb: [
        {
          label: 'Seller Attributes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add/:id',
    component: UpdateAttributesComponent,
    data: {
      title: 'Seller Attributes',
      breadcrumb: [
        {
          label: 'Seller Attributes',
          url: 'seller-attributes',
        },
        {
          label: '{{attrTitle}}',
          url: 'seller-attributes',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributesRoutingModule {}
