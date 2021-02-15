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

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { ActiveTaxesComponent } from './components/active-taxes/active-taxes.component';
import { DeletedTaxesComponent } from './components/deleted-taxes/deleted-taxes.component';
import { DeactivatedTaxesComponent } from './components/deactivated-taxes/deactivated-taxes.component';
import { SuspendedTaxesComponent } from './components/suspended-taxes/suspended-taxes.component';
import { ReportedTaxesComponent } from './components/reported-taxes/reported-taxes.component';
import { TaxesService } from './components/service/taxes.service';
import { TaxesViewsComponent } from './components/inner-page/taxes-views/taxes-views.component';
import { TaxesLikesComponent } from './components/inner-page/taxes-likes/taxes-likes.component';
import { UsertaxesDialogComponent } from './components/inner-page/usertaxes-dialog/usertaxes-dialog.component';
import { TaxesAddComponent } from './components/inner-page/taxes-add/taxes-add.component';

import { TaxesUserdetailsComponent } from './components/inner-page/taxes-userdetails/taxes-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TaxesCommentsComponent } from './components/inner-page/taxes-comments/taxes-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';

const ENTRY_COMPONENT = [UsertaxesDialogComponent];

@NgModule({
  declarations: [
    TaxesComponent,
    ActiveTaxesComponent,
    DeletedTaxesComponent,
    DeactivatedTaxesComponent,
    SuspendedTaxesComponent,
    ReportedTaxesComponent,
    TaxesViewsComponent,
    TaxesLikesComponent,
    UsertaxesDialogComponent,
    TaxesAddComponent,
    TaxesUserdetailsComponent,
    TaxesCommentsComponent,
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
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
    TaxesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class TaxesModule {}
