import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';
import {
  NbDialogModule,
  NbWindowModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng5SliderModule } from 'ng5-slider';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FlatpickrModule } from 'angularx-flatpickr';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingComponent } from './rating.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { SellerRatingComponent } from './components/seller-rating/seller-rating.component';
import { BuyerRatingComponent } from './components/buyer-rating/buyer-rating.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { RatingService } from './components/service/rating.service';
import { RatingViewsComponent } from './components/inner-page/rating-views/rating-views.component';
import { RatingsComponent } from './components/inner-page/ratings/ratings.component';
import { UserratingDialogComponent } from './components/inner-page/userrating-dialog/userrating-dialog.component';
import { RatingAddComponent } from './components/inner-page/rating-add/rating-add.component';

import { RatingUserdetailsComponent } from './components/inner-page/rating-userdetails/rating-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RatingCommentsComponent } from './components/inner-page/rating-comments/rating-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RatingParametersComponent } from './components/rating-parameters/rating-parameters.component';
import { ReviewRatingsComponent } from './components/inner-page/review-ratings/review-ratings.component';

const ENTRY_COMPONENT = [UserratingDialogComponent];

@NgModule({
  declarations: [
    RatingParametersComponent,
    RatingComponent,
    ProductRatingComponent,
    ProductReviewComponent,
    SellerRatingComponent,
    BuyerRatingComponent,
    BuyerComponent,
    RatingViewsComponent,
    RatingsComponent,
    ReviewRatingsComponent,
    UserratingDialogComponent,
    RatingAddComponent,
    RatingUserdetailsComponent,
    RatingCommentsComponent,
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    UiSwitchModule,
    Ng5SliderModule,
    // ImageCropperModule,
    FlatpickrModule.forRoot(),
    SelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    RatingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class RatingModule {}
