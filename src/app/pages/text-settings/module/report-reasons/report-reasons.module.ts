import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { ReportReasonsRoutingModule } from './report-reasons-routing.module';
import { ReportReasonsComponent } from './report-reasons.component';
import { ReportTagReasonsComponent } from './components/report-tag-reasons/report-tag-reasons.component';
import { ReportUserReasonsComponent } from './components/report-user-reasons/report-user-reasons.component';
import { ReportSceneReasonsComponent } from './components/report-scene-reasons/report-scene-reasons.component';
import { ReportReasonsService } from './components/service/report-reasons.service';
import { ReportUpdateCategoryComponent } from './components/report-update-category/report-update-category.component';

@NgModule({
  declarations: [
    ReportReasonsComponent,
    ReportTagReasonsComponent,
    ReportUserReasonsComponent,
    ReportSceneReasonsComponent,
    ReportUpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    ReportReasonsRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
  ],
  providers: [
    ReportReasonsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class ReportReasonsModule {}
