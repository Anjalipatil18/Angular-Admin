import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'faq-data',
    loadChildren: './faq-data/faq-data.module#FaqDataModule',
  },
  // {
  //   path: 'agents',
  //   loadChildren: './agents/agents.module#AgentsModule',
  //   data: {
  //     title: 'AGENTS SUPPORT TEXT',
  //     breadcrumb: [
  //       {
  //         label: 'AGENTS SUPPORT TEXT',
  //         url: 'text-settings/support-text/agents'
  //       }
  //     ]
  //   }
  // },
  { path: '', redirectTo: 'faq-data', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqRoutingModule {}
