import { AdminUsersService } from './components/service/admin-users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import { RoleComponent } from './components/role/role.component';
import { UsersComponent } from './components/users/users.component';
import { DialogRoleComponent } from './components/role/dialog-role/dialog-role.component';
import { UsersDialogComponent } from './components/users/users-dialog/users-dialog.component';
import { UsersSessionComponent } from './components/users/users-session/users-session.component';
import { DeletedUsersComponent } from './components/deleted-users/deleted-users.component';

const ENTRY_COMPONENT = [DialogRoleComponent, UsersDialogComponent];

@NgModule({
  declarations: [
    AdminUsersComponent,
    RoleComponent,
    UsersComponent,
    DialogRoleComponent,
    UsersDialogComponent,
    UsersSessionComponent,
    DeletedUsersComponent,
  ],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    AdminUsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class AdminUsersModule {}
