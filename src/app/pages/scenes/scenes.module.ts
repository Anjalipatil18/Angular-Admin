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
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FlatpickrModule } from 'angularx-flatpickr';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';
import { ActiveScenesComponent } from './components/active-scenes/active-scenes.component';
import { DeletedScenesComponent } from './components/deleted-scenes/deleted-scenes.component';
import { ReportedScenesComponent } from './components/reported-scenes/reported-scenes.component';
import { SuspendedScenesComponent } from './components/suspended-scenes/suspended-scenes.component';

@NgModule({
  declarations: [
    ScenesComponent,
    ActiveScenesComponent,
    DeletedScenesComponent,
    ReportedScenesComponent,
    SuspendedScenesComponent,
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    FlatpickrModule.forRoot(),
    SelectDropDownModule,
  ],
  providers: [
    // TagsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class ScenesModule {}
