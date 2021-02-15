import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { UsersScenesRoutingModule } from './users-scenes-routing.module';
import { UsersScenesComponent } from './users-scenes.component';
import { ActiveScenesComponent } from './components/active-scenes/active-scenes.component';
import { DeletedScenesComponent } from './components/deleted-scenes/deleted-scenes.component';
import { ReportedScenesComponent } from './components/reported-scenes/reported-scenes.component';
import { SuspendedScenesComponent } from './components/suspended-scenes/suspended-scenes.component';

@NgModule({
  declarations: [
    UsersScenesComponent,
    ActiveScenesComponent,
    DeletedScenesComponent,
    ReportedScenesComponent,
    SuspendedScenesComponent,
  ],
  imports: [
    CommonModule,
    UsersScenesRoutingModule,
    ThemeModule,
    SharedLazyModule,
  ],
})
export class UsersScenesModule {}
