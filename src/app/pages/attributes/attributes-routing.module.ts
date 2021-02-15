import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributesComponent } from './attributes.component';
import { UpdateAttributesComponent } from './components/update-attributes/update-attributes.component';

const routes: Routes = [
  {
    path: '',
    component: AttributesComponent,
    data: {
      title: 'Attributes',
      breadcrumb: [
        {
          label: 'Attributes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add/:id',
    component: UpdateAttributesComponent,
    data: {
      title: 'Attributes',
      breadcrumb: [
        {
          label: 'Attributes',
          url: 'attributes',
        },
        {
          label: '{{attrTitle}}',
          url: 'attributes',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributesRoutingModule {}
