import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextSettingsRoutingModule } from './text-settings-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TextService } from './module/service/text.service';

import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';
import { ThemeModule } from 'src/app/@theme/theme.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, TextSettingsRoutingModule, ThemeModule],
  providers: [
    TextService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class TextSettingsModule {}
