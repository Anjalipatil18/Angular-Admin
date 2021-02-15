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
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';
import { PromotionPlanRoutingModule } from './promotion-plan-routing.module';
import { PromotionPlanComponent } from './promotion-plan.component';
import { ActivePromotionPlanComponent } from './components/active-plans/active-promotion-plan.component';
import { DeletedPromotionPlanComponent } from './components/deleted-plans/deleted-promotion-plan.component';
import { PromotionPlanService } from './components/service/promotion-plan.service';
import { PromotionPlanAddComponent } from './components/inner-page/promotion-plan-add/promotion-plan-add.component';
import { PurchaseLogsPlansComponent } from './components/inner-page/purchase-logs/purchase-logs.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';

const ENTRY_COMPONENT = [];

@NgModule({
  declarations: [
    PromotionPlanComponent,
    ActivePromotionPlanComponent,
    SellerEditViewComponent,
    DeletedPromotionPlanComponent,
    PromotionPlanAddComponent,
    PurchaseLogsPlansComponent,
  ],
  imports: [
    CommonModule,
    PromotionPlanRoutingModule,
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
    PromotionPlanService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class PromotionPlanModule {}
