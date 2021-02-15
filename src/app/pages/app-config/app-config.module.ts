import { AppConfigService } from './components/service/app-config.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AppConfigRoutingModule } from './app-config-routing.module';
import { AppConfigComponent } from './app-config.component';
import { UsersComponent } from './components/users/users.component';

const ENTRY_COMPONENT = [];

@NgModule({
  declarations: [AppConfigComponent, UsersComponent],
  imports: [
    CommonModule,
    AppConfigRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    AppConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class AppConfigModule {}
