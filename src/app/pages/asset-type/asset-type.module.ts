import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { NbDialogModule, NbWindowModule } from '@nebular/theme';

import { AssetTypeRoutingModule } from './asset-type-routing.module';
import { AssetTypeComponent } from './asset-type.component';
import { ActiveComponent } from './components/active/active.component';
import { InActiveComponent } from './components/in-active/in-active.component';
import { DeletedComponent } from './components/deleted/deleted.component';
import { AssetTypeService } from './components/service/asset-type.service';
import { SubTypeComponent } from './components/inner-page/sub-type/sub-type.component';
import { SubSubTypeComponent } from './components/inner-page/sub-sub-type/sub-sub-type.component';
import { UpdateSubTypeComponent } from './components/inner-page/update-sub-type/update-sub-type.component';
import { AttributeDragDropComponent } from './components/inner-page/attribute-drag-drop/attribute-drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypedetailsDialogComponent } from './components/inner-page/typedetails-dialog/typedetails-dialog.component';
import { FileUploadModule } from 'ng2-file-upload';

const ENTRY_COMPONENT = [TypedetailsDialogComponent];

@NgModule({
  declarations: [
    AssetTypeComponent,
    ActiveComponent,
    InActiveComponent,
    DeletedComponent,
    SubTypeComponent,
    SubSubTypeComponent,
    UpdateSubTypeComponent,
    AttributeDragDropComponent,
    TypedetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    AssetTypeRoutingModule,
    ThemeModule,
    SharedLazyModule,
    DragDropModule,
    NbDialogModule.forChild(),
    FileUploadModule,
  ],
  providers: [
    AssetTypeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class AssetTypeModule {}
