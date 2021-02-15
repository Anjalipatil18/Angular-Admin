import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users.component';
import { UsersSessionComponent } from './components/users/users-session/users-session.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
    data: {
      title: 'Admin Users',
      breadcrumb: [
        {
          label: 'Admin Users',
          url: '',
        },
      ],
    },
  },
  {
    path: ':id',
    component: UsersSessionComponent,
    data: {
      title: 'Admin Users',
      breadcrumb: [
        {
          label: 'Admin Users',
          url: 'admin-users',
        },
        {
          label: 'Session List',
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
export class AdminUsersRoutingModule {}
