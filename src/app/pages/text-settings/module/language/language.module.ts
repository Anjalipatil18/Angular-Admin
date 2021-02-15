import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { LanguageComponent } from './language.component';
import { LanguageRoutingModule } from './language-routing.module';
import { LanEnabledComponent } from './components/lan-enabled/lan-enabled.component';
import { LanDisabledComponent } from './components/lan-disabled/lan-disabled.component';
import { LanguageService } from './service/lang.service';

@NgModule({
  declarations: [LanguageComponent, LanEnabledComponent, LanDisabledComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
  ],
  providers: [
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class LanguageModule {}
