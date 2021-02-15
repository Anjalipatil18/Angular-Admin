import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeGroupComponent } from './attribute-group.component';
import { UpdateAttributeGroupComponent } from './components/update-attribute-group/update-attribute-group.component';
import { AttributePositionComponent } from './components/attribute-position/attribute-position.component';

const routes: Routes = [
  {
    path: '',
    component: AttributeGroupComponent,
    data: {
      title: 'Attribute Group',
      breadcrumb: [
        {
          label: 'Attribute Group',
          url: 'attribute-group',
        },
      ],
    },
  },
  {
    path: 'ordering/:id',
    component: AttributePositionComponent,
    data: {
      title: 'Attributes Group',
      breadcrumb: [
        {
          label: 'Attribute Group',
          url: 'attribute-group',
        },
        {
          label: 'Ordering',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add/:id',
    component: UpdateAttributeGroupComponent,
    data: {
      title: 'Attribute Group',
      breadcrumb: [
        {
          label: 'Attributes Group',
          url: 'attribute-group',
        },
        {
          label: '{{attrGroupTitle}}',
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
export class AttributeGroupRoutingModule {}
