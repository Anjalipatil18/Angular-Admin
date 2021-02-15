import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCategoryComponent } from './components/user-category/user-category.component';
import { UserSubcategoryComponent } from './components/user-subcategory/user-subcategory.component';
import { UserUpdatecategoryComponent } from './components/user-updatecategory/user-updatecategory.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserCategoryComponent,
        data: {
          title: 'SUPPORT TEXT',
          breadcrumb: [
            {
              label: 'Support Text / Category',
              url: '',
            },
          ],
        },
      },
      {
        path: 'add/:id/:sId',
        component: UserUpdatecategoryComponent,
        data: {
          title: 'SUPPORT TEXT / CATEGORY ADD',
          breadcrumb: [
            {
              label: 'Support Text',
              url: 'text-settings/support-text/user',
            },
            {
              label: '{{userTitle}}',
              url: 'text-settings/support-text/user',
            },
            {
              label: '{{updateTitle}}',
              url: '',
            },
          ],
        },
      },
      {
        path: 'UserSubCategory/:id',
        component: UserSubcategoryComponent,
        data: {
          title: 'SUPPORT TEXT / SUB CATEGORY',
          breadcrumb: [
            {
              label: 'Support Text',
              url: 'text-settings/support-text/user',
            },
            {
              label: 'Category ({{catTitle}})',
              url: 'text-settings/support-text/user',
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
export class UserRoutingModule {}
