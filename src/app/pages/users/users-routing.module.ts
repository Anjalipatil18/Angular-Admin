import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserdetailsUpdateComponent } from './components/inner-pages/userdetails-update/userdetails-update.component';
import { UsersDeviceComponent } from './components/inner-pages/users-device/users-device.component';
import { UsersFollowComponent } from './components/inner-pages/users-follow/users-follow.component';
import { UsersProductsSharedComponent } from './components/inner-pages/users-productsShared/users-productsShared.component';
import { UsersProductSharedClickLogsComponent } from './components/inner-pages/users-productShared-clicklogs/users-productShared-clicklogs.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
      ],
    },
  },
  {
    path: 'ads/:userId',
    loadChildren:
      './components/inner-pages/users-tags/users-tags.module#UsersTagsModule',
  },
  {
    path: 'scenes',
    loadChildren:
      './components/inner-pages/users-scenes/users-scenes.module#UsersScenesModule',
  },
  {
    path: 'devices/:id',
    component: UsersDeviceComponent,
    data: {
      title: 'devices',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
        {
          label: 'Devices',
          url: '',
        },
      ],
    },
  },
  {
    path: 'follow/:sCode/:id',
    component: UsersFollowComponent,
    data: {
      title: 'follow',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
        {
          label: 'follow',
          url: '',
        },
      ],
    },
  },
  {
    path: 'users-productsShared/:sCode/:id',
    component: UsersProductsSharedComponent,
    data: {
      title: 'Users Products Shared',
      breadcrumb: [
        {
          label: 'productsShared',
          url: 'users',
        },
        {
          label: 'productsShared',
          url: '',
        },
      ],
    },
  },
  {
    path: 'users-clicklogs/:sCode/:id/:subid/:num/:name',
    component: UsersProductSharedClickLogsComponent,
    data: {
      title: 'users click logs',
      breadcrumb: [
        {
          label: 'users-clicklogs',
          url: 'users/users-productsShared/:sCode/:id',
        },
        {
          label: '{{AddtagT}} Click logs',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add/:id/:sId',
    component: UserdetailsUpdateComponent,
    data: {
      title: 'add',
      breadcrumb: [
        {
          label: 'Users',
          url: 'users',
        },
        {
          label: 'add',
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
export class UsersRoutingModule {}
