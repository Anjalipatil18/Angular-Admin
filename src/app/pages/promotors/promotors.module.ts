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

import { PromotorsRoutingModule } from './promotors-routing.module';
import { PromotorsComponent } from './promotors.component';
import { ActivePromotorsComponent } from './components/active-promotors/active-promotors.component';
import { DeletedPromotorsComponent } from './components/deleted-promotors/deleted-promotors.component';
import { DeactivatedPromotorsComponent } from './components/deactivated-promotors/deactivated-promotors.component';
import { SuspendedPromotorsComponent } from './components/suspended-promotors/suspended-promotors.component';
import { ReportedPromotorsComponent } from './components/reported-promotors/reported-promotors.component';
import { PromotorsService } from './components/service/promotors.service';
import { PromotorsViewsComponent } from './components/inner-page/promotors-views/promotors-views.component';
import { PromotorsLikesComponent } from './components/inner-page/promotors-likes/promotors-likes.component';
import { PromotorsProductsSharedComponent } from './components/inner-page/promotors-productsShared/promotors-productsShared.component';
import { UserpromotorsDialogComponent } from './components/inner-page/userpromotors-dialog/userpromotors-dialog.component';
import { PromotorsAddComponent } from './components/inner-page/promotors-add/promotors-add.component';
import { ProductSharedClickLogsDialogComponent } from './components/inner-page/productsharedclicklogs-dialog/productsharedclicklogs-dialog.component';
import { NewUsersPromotorsDialogComponent } from './components/inner-page/newuserpromotor-dialog/newuserspromotor-dialog.component';
import { PromotorsGuestClicksComponent } from './components/inner-page/promotors-guestClicks/promotors-guestClicks.component';
import { PromotorsUserClicksComponent } from './components/inner-page/promotors-userClicks/promotors-userClicks.component';

import { PromotorsUserdetailsComponent } from './components/inner-page/promotors-userdetails/promotors-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PromotorsCommentsComponent } from './components/inner-page/promotors-comments/promotors-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const ENTRY_COMPONENT = [
  UserpromotorsDialogComponent,
  NewUsersPromotorsDialogComponent,
];

@NgModule({
  declarations: [
    PromotorsComponent,
    PromotorsGuestClicksComponent,
    PromotorsUserClicksComponent,
    ActivePromotorsComponent,
    DeletedPromotorsComponent,
    DeactivatedPromotorsComponent,
    SuspendedPromotorsComponent,
    ReportedPromotorsComponent,
    PromotorsViewsComponent,
    PromotorsLikesComponent,
    PromotorsProductsSharedComponent,
    UserpromotorsDialogComponent,
    ProductSharedClickLogsDialogComponent,
    NewUsersPromotorsDialogComponent,
    PromotorsAddComponent,
    PromotorsUserdetailsComponent,
    PromotorsCommentsComponent,
  ],
  imports: [
    CommonModule,
    PromotorsRoutingModule,
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
    PromotorsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class PromotorsModule {}
