import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  },
  {
    path: 'agents',
    loadChildren: './agents/agents.module#AgentsModule',
    data: {
      title: 'AGENTS SUPPORT TEXT',
      breadcrumb: [
        {
          label: 'AGENTS SUPPORT TEXT',
          url: 'text-settings/support-text/agents',
        },
      ],
    },
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportTextRoutingModule {}
