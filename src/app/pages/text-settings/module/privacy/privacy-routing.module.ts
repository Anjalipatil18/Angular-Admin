import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy.component';
const routes: Routes = [
  {
    path: '',
    component: PrivacyComponent,
    data: {
      title: 'PRIVACY POLICIES',
      breadcrumb: [
        {
          label: 'Privacy',
          url: 'text-settings/privacy',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyRoutingModule {}
