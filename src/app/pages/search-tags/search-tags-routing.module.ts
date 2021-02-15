import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTagsPageComponent } from './components/search-tags-page/search-tags-page.component';
import { SearchTagAddComponent } from './components/inner-page/search-tag-add/search-tag-add.component';
import { SearchTagEditComponent } from './components/inner-page/search-tag-edit/search-tag-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTagsPageComponent,
    data: {
      title: 'Search Tags',
      breadcrumb: [
        {
          label: 'Search Tags',
          url: '',
        },
      ],
    },
  },
  {
    path: 'seller-editUpdate/:id',
    component: SearchTagEditComponent,
    data: {
      title: 'Search Tags Edit',
      breadcrumb: [
        {
          label: 'Search Tags',
          url: 'search-tags',
        },
        {
          label: 'Edit',
          url: '',
        },
      ],
    },
  },
  {
    path: 'add-city/:sCode/:id',
    component: SearchTagAddComponent,
    data: {
      title: 'Add Tags',
      breadcrumb: [
        {
          label: 'Search Tags',
          url: 'search-tags',
        },
        {
          label: 'Add',
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
export class SearchTagsRoutingModule {}
