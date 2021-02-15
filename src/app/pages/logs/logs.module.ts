import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { LogsRoutingModule } from './logs-routing.module';
import { SmsLogsComponent } from './components/sms-logs/sms-logs.component';
import { EmailLogsComponent } from './components/email-logs/email-logs.component';
import { LogsService } from './components/service/log.service';
@NgModule({
  declarations: [SmsLogsComponent, EmailLogsComponent],
  imports: [CommonModule, LogsRoutingModule, ThemeModule, SharedLazyModule],
  providers: [
    LogsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class LogsModule {}
