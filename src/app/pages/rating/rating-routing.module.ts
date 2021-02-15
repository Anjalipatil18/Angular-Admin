import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingComponent } from './rating.component';
import { RatingViewsComponent } from './components/inner-page/rating-views/rating-views.component';
import { RatingsComponent } from './components/inner-page/ratings/ratings.component';
import { RatingAddComponent } from './components/inner-page/rating-add/rating-add.component';
import { RatingUserdetailsComponent } from './components/inner-page/rating-userdetails/rating-userdetails.component';
import { RatingCommentsComponent } from './components/inner-page/rating-comments/rating-comments.component';
import { ReviewRatingsComponent } from './components/inner-page/review-ratings/review-ratings.component';

const routes: Routes = [
  {
    path: '',
    component: RatingComponent,
    data: {
      title: 'Ratings',
      breadcrumb: [
        {
          label: 'Ratings',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-views',
    component: RatingViewsComponent,
    data: {
      title: 'Ads View',
      breadcrumb: [
        {
          label: 'Rating',
          url: 'rating',
        },
        {
          label: 'Views',
          url: '',
        },
      ],
    },
  },
  {
    path: 'product-ratings/:name/:id',
    component: RatingsComponent,
    data: {
      title: 'Product Ratings',
      breadcrumb: [
        {
          label: 'Ratings',
          url: 'rating',
        },
        {
          label: '{{AddtagT}} ratings',
          url: '',
        },
      ],
    },
  },
  {
    path: 'product-review-ratings/:name/:id',
    component: ReviewRatingsComponent,
    data: {
      title: 'Product Ratings',
      breadcrumb: [
        {
          label: 'Ratings',
          url: 'rating',
        },
        {
          label: '{{AddtagT}} ratings',
          url: '',
        },
      ],
    },
  },
  {
    path: 'ads-comments/:id',
    component: RatingCommentsComponent,
    data: {
      title: 'Ads Comments',
      breadcrumb: [
        {
          label: 'Ratingss',
          url: 'rating',
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
    component: RatingUserdetailsComponent,
    data: {
      title: 'Ads User Details',
      breadcrumb: [
        {
          label: 'Ratings',
          url: 'rating',
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
    component: RatingAddComponent,
    data: {
      title: 'Ads Update',
      breadcrumb: [
        {
          label: 'Ratings',
          url: 'rating',
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
export class RatingRoutingModule {}
