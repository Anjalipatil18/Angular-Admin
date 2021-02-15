import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportReasonsComponent } from './report-reasons.component';
import { ReportUpdateCategoryComponent } from './components/report-update-category/report-update-category.component';

const routes: Routes = [
  {
    path: '',
    component: ReportReasonsComponent,
    data: {
      title: 'REPORT REASONS',
      breadcrumb: [
        {
          label: 'Report Reasons',
          url: 'text-settings/report-reasons',
        },
      ],
    },
  },
  {
    path: 'add/:id/:typeId',
    component: ReportUpdateCategoryComponent,
    data: {
      title: 'Report/Add',
      breadcrumb: [
        {
          label: 'Report Reasons',
          url: 'text-settings/report-reasons',
        },
        {
          label: '{{rTitle}}',
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
export class ReportReasonsRoutingModule {}
