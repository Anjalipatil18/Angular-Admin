import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AttributesComponent } from './attributes.component';
import { ActiveAttributesComponent } from './components/active-attributes/active-attributes.component';
import { DeletedAttributesComponent } from './components/deleted-attributes/deleted-attributes.component';
import { UpdateAttributesComponent } from './components/update-attributes/update-attributes.component';
import { AttributesService } from './components/service/attributes.service';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbToastrModule, NbDialogModule } from '@nebular/theme';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';
import { UsertagsDialogComponent } from './components/usertags-dialog/usertags-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileUploadModule } from 'ng2-file-upload';

const ENTRY_COMPONENT = [UsertagsDialogComponent];

@NgModule({
  declarations: [
    AttributesComponent,
    ActiveAttributesComponent,
    DeletedAttributesComponent,
    UpdateAttributesComponent,
    UsertagsDialogComponent,
  ],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    ThemeModule,
    SharedLazyModule,
    UiSwitchModule,
    NgSelectModule,
    FormsModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forChild(),
    TagInputModule,
    DragDropModule,
    FileUploadModule,
  ],
  providers: [
    AttributesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class AttributesModule {}
