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

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { ActiveColorsComponent } from './components/active-colors/active-colors.component';
import { DeletedColorsComponent } from './components/deleted-colors/deleted-colors.component';
import { DeactivatedColorsComponent } from './components/deactivated-colors/deactivated-colors.component';
import { SuspendedColorsComponent } from './components/suspended-colors/suspended-colors.component';
import { ReportedColorsComponent } from './components/reported-colors/reported-colors.component';
import { ColorsService } from './components/service/colors.service';
import { ColorsViewsComponent } from './components/inner-page/colors-views/colors-views.component';
import { ColorsLikesComponent } from './components/inner-page/colors-likes/colors-likes.component';
import { UsercolorsDialogComponent } from './components/inner-page/usercolors-dialog/usercolors-dialog.component';
import { ColorsAddComponent } from './components/inner-page/colors-add/colors-add.component';

import { ColorsUserdetailsComponent } from './components/inner-page/colors-userdetails/colors-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ColorsCommentsComponent } from './components/inner-page/colors-comments/colors-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const ENTRY_COMPONENT = [UsercolorsDialogComponent];

@NgModule({
  declarations: [
    ColorsComponent,
    ActiveColorsComponent,
    DeletedColorsComponent,
    DeactivatedColorsComponent,
    SuspendedColorsComponent,
    ReportedColorsComponent,
    ColorsViewsComponent,
    ColorsLikesComponent,
    UsercolorsDialogComponent,
    ColorsAddComponent,
    ColorsUserdetailsComponent,
    ColorsCommentsComponent,
  ],
  imports: [
    CommonModule,
    ColorsRoutingModule,
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
    ColorsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class ColorsModule {}
