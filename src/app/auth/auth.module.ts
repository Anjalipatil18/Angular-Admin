import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { ThemeModule } from '../@theme/theme.module';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/interceptor.config';
import { LoginService } from './services/login.service';
import { SharedLazyModule } from '../shared/shared-lazy.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedLazyModule,
    ThemeModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
