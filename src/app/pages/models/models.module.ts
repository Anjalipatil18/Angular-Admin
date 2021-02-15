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

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';
import { ProductModelsComponent } from './components/product-models/product-models.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { SellerModelsComponent } from './components/seller-models/seller-models.component';
import { BuyerModelsComponent } from './components/buyer-models/buyer-models.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { ModelsService } from './components/service/models.service';
import { ModelsViewsComponent } from './components/inner-page/models-views/models-views.component';
import { ModelsPageComponent } from './components/inner-page/models/models.component';
import { UsermodelsDialogComponent } from './components/inner-page/usermodels-dialog/usermodels-dialog.component';
import { ModelsAddComponent } from './components/inner-page/models-add/models-add.component';

import { ModelsUserdetailsComponent } from './components/inner-page/models-userdetails/models-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModelsCommentsComponent } from './components/inner-page/models-comments/models-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModelsParametersComponent } from './components/models-parameters/models-parameters.component';
import { ReviewModelsComponent } from './components/inner-page/review-models/review-models.component';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';
import { AddModelsComponent } from './components/inner-page/add-models/models-add.component';

const ENTRY_COMPONENT = [UsermodelsDialogComponent];

@NgModule({
  declarations: [
    ModelsParametersComponent,
    ModelsComponent,
    ProductModelsComponent,
    ProductReviewComponent,
    SellerModelsComponent,
    BuyerModelsComponent,
    BuyerComponent,
    ModelsViewsComponent,
    ModelsPageComponent,
    ReviewModelsComponent,
    UsermodelsDialogComponent,
    ModelsAddComponent,
    AddModelsComponent,
    ModelsUserdetailsComponent,
    ModelsCommentsComponent,
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
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
    TagInputModule,
  ],
  providers: [
    ModelsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class ModelsModule {}
