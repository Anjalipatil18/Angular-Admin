import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersScenesComponent } from './users-scenes.component';

const routes: Routes = [
  {
    path: '',
    component: UsersScenesComponent,
    data: {
      title: 'Scenes',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
        {
          label: 'Scenes',
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
export class UsersScenesRoutingModule {}
