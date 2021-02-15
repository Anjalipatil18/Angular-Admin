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

import { CountryRoutingModule } from './website-banner-routing.module';
import { WebsiteBannerService } from './components/service/website-banner.service';

import { BannerAddComponent } from './components/inner-page/website-banner-add/website-banner-add.component';

import { WebsiteBannerTabComponent } from './components/website-banner-tab/website-banners.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { WebsiteBannerComponent } from './website-banner.component';

const ENTRY_COMPONENT = [];

@NgModule({
  declarations: [
    BannerAddComponent,
    WebsiteBannerTabComponent,
    SellerEditViewComponent,
    WebsiteBannerComponent,
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
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
    WebsiteBannerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class WebsiteBannerModule {}
