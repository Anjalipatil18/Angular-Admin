import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { UsersTagsComponent } from './users-tags.component';
import { UsersTagsRoutingModule } from './users-tags-routing.module';
import { ActiveTagsComponent } from './components/active-tags/active-tags.component';
import { DeletedTagsComponent } from './components/deleted-tags/deleted-tags.component';
import { DeactivatedTagsComponent } from './components/deactivated-tags/deactivated-tags.component';
import { TagsService } from 'src/app/pages/tags/components/service/tags.service';

@NgModule({
  declarations: [
    UsersTagsComponent,
    ActiveTagsComponent,
    DeletedTagsComponent,
    DeactivatedTagsComponent,
  ],
  imports: [
    CommonModule,
    UsersTagsRoutingModule,
    ThemeModule,
    SharedLazyModule,
  ],
  providers: [
    TagsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class UsersTagsModule {}
