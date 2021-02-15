import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ActiveVerifiedComponent } from './components/active-verified/active-verified.component';
import { SuspendedComponent } from './components/suspended/suspended.component';
import { UnverifiedComponent } from './components/unverified/unverified.component';
import { DeletedComponent } from './components/deleted/deleted.component';
import { UsersService } from './components/service/users.service';
import { UsersDeviceComponent } from './components/inner-pages/users-device/users-device.component';
// import { UsersTagsComponent } from './components/inner-pages/users-tags/users-tags.component';
import { UsersFollowComponent } from './components/inner-pages/users-follow/users-follow.component';
import { UsersProductsSharedComponent } from './components/inner-pages/users-productsShared/users-productsShared.component';
import { UsersProductSharedClickLogsComponent } from './components/inner-pages/users-productShared-clicklogs/users-productShared-clicklogs.component';
import { UsersGuestClicksComponent } from './components/inner-pages/users-guestClicks/users-guestClicks.component';
import { UsersUserClicksComponent } from './components/inner-pages/users-userClicks/users-userClicks.component';

// import { UsersScenesComponent } from './components/inner-pages/users-scenes/users-scenes.component';
import { UserdetailsDialogComponent } from './components/inner-pages/userdetails-dialog/userdetails-dialog.component';
import { UserdetailsUpdateComponent } from './components/inner-pages/userdetails-update/userdetails-update.component';

const ENTRY_COMPONENT = [UserdetailsDialogComponent];

@NgModule({
  declarations: [
    UsersComponent,
    ActiveVerifiedComponent,
    SuspendedComponent,
    UnverifiedComponent,
    DeletedComponent,
    UsersDeviceComponent,
    //  UsersTagsComponent,
    UsersFollowComponent,
    UsersProductsSharedComponent,
    UsersProductSharedClickLogsComponent,
    UsersGuestClicksComponent,
    UsersUserClicksComponent,
    //  UsersScenesComponent,
    UserdetailsDialogComponent,
    UserdetailsUpdateComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class UsersModule {}
