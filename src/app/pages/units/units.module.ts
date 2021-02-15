import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// src/app/@theme/theme.module
import { ThemeModule } from '../../../app/@theme/theme.module';
// src/app/shared/shared-lazy.module
import { SharedLazyModule } from '../../shared/shared-lazy.module';
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

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsComponent } from './units.component';
import { ActiveUnitsComponent } from './components/active-units/active-units.component';

import { UnitsAddComponent } from './components/inner-page/units-add/units-add.component';
import { SellerEditViewComponent } from './components/inner-page/seller-editView/seller-editView.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';
import { DeletedUnitsComponent } from './components/deleted-units/deleted-units.component';
import { UnitsService } from './components/service/units.service';

const ENTRY_COMPONENT = [];
// const ENTRY_COMPONENT = [UserUnitsDialogComponent];

@NgModule({
  declarations: [
    UnitsComponent,
    ActiveUnitsComponent,
    DeletedUnitsComponent,
    UnitsAddComponent,
    SellerEditViewComponent,
  ],
  imports: [
    CommonModule,
    UnitsRoutingModule,
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
    UnitsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],

  entryComponents: [...ENTRY_COMPONENT],
})
export class UnitsModule {}
