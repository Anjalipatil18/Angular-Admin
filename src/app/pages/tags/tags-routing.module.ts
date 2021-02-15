import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags.component';
import { TagsViewsComponent } from './components/inner-page/tags-views/tags-views.component';
import { TagsLikesComponent } from './components/inner-page/tags-likes/tags-likes.component';
import { TagsAddComponent } from './components/inner-page/tags-add/tags-add.component';
import { TagsUserdetailsComponent } from './components/inner-page/tags-userdetails/tags-userdetails.component';
import { TagsCommentsComponent } from './components/inner-page/tags-comments/tags-comments.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    data: {
      title: 'Ads',
      breadcrumb: [
        {
          label: 'Ads',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-views',
    component: TagsViewsComponent,
    data: {
      title: 'Ads View',
      breadcrumb: [
        {
          label: 'Tags',
          url: 'tags',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-likes/:id',
    component: TagsLikesComponent,
    data: {
      title: 'Ads Likes',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: 'Likes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-comments/:id',
    component: TagsCommentsComponent,
    data: {
      title: 'Ads Comments',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: 'Comments',
          url: '',
        },
      ],
    },
  },
  {
    path: 'user-details/:sCode/:id',
    component: TagsUserdetailsComponent,
    data: {
      title: 'Ads User Details',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-update/:sCode/:id',
    component: TagsAddComponent,
    data: {
      title: 'Ads Update',
      breadcrumb: [
        {
          label: 'Ads',
          url: 'ads',
        },
        {
          label: '{{AddtagT}}',
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
export class TagsRoutingModule {}
