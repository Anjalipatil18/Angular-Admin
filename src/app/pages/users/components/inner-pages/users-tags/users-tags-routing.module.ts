import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTagsComponent } from './users-tags.component';

const routes: Routes = [
  {
    path: '',
    component: UsersTagsComponent,
    data: {
      title: 'Ads',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
        {
          label: 'Ads',
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
export class UsersTagsRoutingModule {}
