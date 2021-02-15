import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqDataComponent } from './faq-data.component';
import { FaqCategoryComponent } from './components/faq-category/faq-category.component';
import { FaqSubcategoryComponent } from './components/faq-subcategory/faq-subcategory.component';
import { FaqUpdatecategoryComponent } from './components/faq-updatecategory/faq-updatecategory.component';
import { FaqEditViewComponent } from './components/seller-editView/seller-editView.component';
const routes: Routes = [
  {
    path: '',
    component: FaqDataComponent,
    children: [
      {
        path: '',
        component: FaqCategoryComponent,
        data: {
          title: 'FAQ',
          breadcrumb: [
            {
              label: 'FAQ',
              url: '',
            },
          ],
        },
      },
      {
        path: 'seller-editUpdate/:id/:parentId',
        component: FaqEditViewComponent,
        data: {
          title: 'FAQ / EDIT',
          breadcrumb: [
            {
              label: 'FAQ',
              url: 'text-settings/faq/faq-data',
            },
            {
              label: 'Edit',
              url: '',
            },
          ],
        },
      },
      {
        path: 'add/:id/:sId',
        component: FaqUpdatecategoryComponent,
        data: {
          title: 'FAQ / ADD',
          breadcrumb: [
            {
              label: 'FAQ',
              url: 'text-settings/faq/faq-data',
            },
            {
              label: '{{userTitle}}',
              url: 'text-settings/faq/faq-data',
            },
            {
              label: '{{updateTitle}}',
              url: '',
            },
          ],
        },
      },
      {
        path: 'faq-subcategory/:id/:title',
        component: FaqSubcategoryComponent,
        data: {
          title: 'FAQ / SUB CATEGORY',
          breadcrumb: [
            {
              label: 'FAQ',
              url: 'text-settings/faq/faq-data',
            },
            {
              label: '{{title}}',
              url: 'text-settings/faq/faq-data',
            },
            {
              label: 'Sub Category',
              url: '',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqDataRoutingModule {}
