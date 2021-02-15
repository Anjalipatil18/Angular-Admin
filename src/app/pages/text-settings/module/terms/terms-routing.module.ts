import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './terms.component';
const routes: Routes = [
  {
    path: '',
    component: TermsComponent,
    data: {
      title: 'TERMS',
      breadcrumb: [
        {
          label: 'Terms and Conditions',
          url: 'text-settings/terms',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsRoutingModule {}
