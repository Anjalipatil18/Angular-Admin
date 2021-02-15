import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';
import { ColorsViewsComponent } from './components/inner-page/colors-views/colors-views.component';
import { ColorsLikesComponent } from './components/inner-page/colors-likes/colors-likes.component';
import { ColorsAddComponent } from './components/inner-page/colors-add/colors-add.component';
import { ColorsUserdetailsComponent } from './components/inner-page/colors-userdetails/colors-userdetails.component';
import { ColorsCommentsComponent } from './components/inner-page/colors-comments/colors-comments.component';

const routes: Routes = [
  {
    path: '',
    component: ColorsComponent,
    data: {
      title: 'Colors',
      breadcrumb: [
        {
          label: 'Colors',
          url: '',
        },
      ],
    },
  },
  {
    path: 'colors-views',
    component: ColorsViewsComponent,
    data: {
      title: 'Colors View',
      breadcrumb: [
        {
          label: 'Colors',
          url: 'colors',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'colors-likes/:id',
    component: ColorsLikesComponent,
    data: {
      title: 'Colors Likes',
      breadcrumb: [
        {
          label: 'Colors',
          url: 'colors',
        },
        {
          label: 'Likes',
          url: '',
        },
      ],
    },
  },
  {
    path: 'colors-comments/:id',
    component: ColorsCommentsComponent,
    data: {
      title: 'Colors Comments',
      breadcrumb: [
        {
          label: 'Colors',
          url: 'colors',
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
    component: ColorsUserdetailsComponent,
    data: {
      title: 'Colors User Details',
      breadcrumb: [
        {
          label: 'Colors',
          url: 'colors',
        },
        {
          label: 'User Details ({{uTitle}})',
          url: '',
        },
      ],
    },
  },
  {
    path: 'colors-update/:sCode/:id',
    component: ColorsAddComponent,
    data: {
      title: 'Colors Update',
      breadcrumb: [
        {
          label: 'Colors',
          url: 'colors',
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
export class ColorsRoutingModule {}
