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

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { ActiveSellerComponent } from './components/active-seller/active-seller.component';
import { DeletedSellerComponent } from './components/deleted-seller/deleted-seller.component';
import { DeactivatedSellerComponent } from './components/deactivated-seller/deactivated-seller.component';
import { SuspendedSellerComponent } from './components/suspended-seller/suspended-seller.component';
import { ReportedSellerComponent } from './components/reported-seller/reported-seller.component';
import { SellerService } from './components/service/seller.service';
import { SellerViewsComponent } from './components/inner-page/seller-views/seller-views.component';
import { SellerLikesComponent } from './components/inner-page/seller-likes/seller-likes.component';
import { UsersellerDialogComponent } from './components/inner-page/userseller-dialog/userseller-dialog.component';
import { SellerAddComponent } from './components/inner-page/seller-add/seller-add.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';

import { NewUsersSellerDialogComponent } from './components/inner-page/newuserseller-dialog/newuserseller-dialog.component';

import { SellerUserdetailsComponent } from './components/inner-page/seller-userdetails/seller-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SellerCommentsComponent } from './components/inner-page/seller-comments/seller-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

const ENTRY_COMPONENT = [
  UsersellerDialogComponent,
  NewUsersSellerDialogComponent,
];

@NgModule({
  declarations: [
    SellerComponent,
    ActiveSellerComponent,
    NewUsersSellerDialogComponent,
    DeletedSellerComponent,
    DeactivatedSellerComponent,
    SuspendedSellerComponent,
    ReportedSellerComponent,
    SellerViewsComponent,
    SellerLikesComponent,
    UsersellerDialogComponent,
    SellerAddComponent,
    SellerUserdetailsComponent,
    SellerCommentsComponent,
    SellerEditViewComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    DatePickerModule,
    UiSwitchModule,
    Ng5SliderModule,
    // ImageCropperModule,
    FlatpickrModule.forRoot(),
    SelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
    FileUploadModule,
  ],
  providers: [
    SellerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class SellerModule {}
