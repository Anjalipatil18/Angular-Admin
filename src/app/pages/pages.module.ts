import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { AuthGuard } from '../auth/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpConfigInterceptor } from "../auth/interceptor/interceptor.config";
import { DialogContentComponent } from './ui-features/dialog-content/dialog-content.component';
import { Ng7DynamicBreadcrumbModule } from 'ng7-dynamic-breadcrumb';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { MomentModule } from 'angular2-moment';
import { ImageCropperDialogComponent } from './ui-features/image-cropper-dialog/image-cropper-dialog.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NbIconModule } from '@nebular/theme';

const ENTRY_COMPONENTS = [DialogContentComponent, ImageCropperDialogComponent];

@NgModule({
  declarations: [
    PagesComponent,
    DialogContentComponent,
    ImageCropperDialogComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    ThemeModule.forRoot(),
    Ng7DynamicBreadcrumbModule,
    MomentModule,
    SelectDropDownModule,
    NbIconModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    // TaxesService,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class PagesModule {}
