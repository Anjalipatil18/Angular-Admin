import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsComponent } from './agents.component';
import { AgentsCategoryComponent } from './components/agents-category/agents-category.component';
import { AgentsSubcategoryComponent } from './components/agents-subcategory/agents-subcategory.component';
import { AgentsUpdatecategoryComponent } from './components/agents-updatecategory/agents-updatecategory.component';
const routes: Routes = [
  {
    path: '',
    component: AgentsComponent,
    children: [
      { path: '', component: AgentsCategoryComponent },
      {
        path: 'add/:id/:sId',
        component: AgentsUpdatecategoryComponent,
        data: {
          title: 'Agents/Add',
          breadcrumb: [
            {
              label: 'Agents / Add',
              url: 'agents/add',
            },
          ],
        },
      },
      { path: 'AgentsSubCategory/:id', component: AgentsSubcategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsRoutingModule {}
