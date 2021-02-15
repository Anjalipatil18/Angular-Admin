import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenesComponent } from './scenes.component';

const routes: Routes = [
  {
    path: '',
    component: ScenesComponent,
    data: {
      title: 'Scenes',
      breadcrumb: [
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
export class ScenesRoutingModule {}
