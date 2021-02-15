import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionPlanComponent } from './promotion-plan.component';
import { PurchaseLogsPlansComponent } from './components/inner-page/purchase-logs/purchase-logs.component';
import { PromotionPlanAddComponent } from './components/inner-page/promotion-plan-add/promotion-plan-add.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionPlanComponent,
    data: {
      title: 'Promotion Plan',
      breadcrumb: [
        {
          label: 'Promotion Plan',
          url: '',
        },
      ],
    },
  },
  {
    path: 'devices/:id',
    component: PurchaseLogsPlansComponent,
    data: {
      title: 'Purchase Logs',
      breadcrumb: [
        {
          label: 'Promotion Plan',
          url: 'promotion-plan',
        },
        {
          label: 'Purchase Logs',
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
          label: 'Promotion Plan',
          url: 'promotion-plan',
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
    component: PromotionPlanAddComponent,
    data: {
      title: 'Ads Update',
      breadcrumb: [
        {
          label: 'Promotion plan',
          url: 'promotion-plan',
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
export class PromotionPlanRoutingModule {}
