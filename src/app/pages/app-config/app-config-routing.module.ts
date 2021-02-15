import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfigComponent } from './app-config.component';

const routes: Routes = [
  {
    path: '',
    component: AppConfigComponent,
    data: {
      title: 'App Config',
      breadcrumb: [
        {
          label: 'App Config',
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
export class AppConfigRoutingModule {}
