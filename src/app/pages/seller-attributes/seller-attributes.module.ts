import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AttributesRoutingModule } from './seller-attributes-routing.module';
import { SellerAttributesComponent } from './seller-attributes.component';
import { ActiveAttributesComponent } from './components/active-attributes/active-attributes.component';
import { DeletedAttributesComponent } from './components/deleted-attributes/deleted-attributes.component';
import { UpdateAttributesComponent } from './components/update-attributes/update-attributes.component';
import { AttributesService } from './components/service/attributes.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FlatpickrModule } from 'angularx-flatpickr';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbToastrModule } from '@nebular/theme';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    SellerAttributesComponent,
    ActiveAttributesComponent,
    DeletedAttributesComponent,
    UpdateAttributesComponent,
  ],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    ThemeModule,
    SharedLazyModule,
    UiSwitchModule,
    NgSelectModule,
    FormsModule,
    NbToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlatpickrModule.forRoot(),
    FileUploadModule,
  ],
  providers: [
    AttributesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class SellerAttributesModule {}
