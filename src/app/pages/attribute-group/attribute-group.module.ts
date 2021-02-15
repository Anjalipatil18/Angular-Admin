import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AttributeGroupRoutingModule } from './attribute-group-routing.module';
import { AttributeGroupComponent } from './attribute-group.component';
import { ActiveGroupComponent } from './components/active-group/active-group.component';
import { DeletedGroupComponent } from './components/deleted-group/deleted-group.component';
import { AttributeGroupService } from './components/service/attribute-group.service';
import { UpdateAttributeGroupComponent } from './components/update-attribute-group/update-attribute-group.component';
import { AttributePositionComponent } from './components/attribute-position/attribute-position.component';
import {
  SelectDropDownModule,
  SelectDropDownComponent,
} from 'ngx-select-dropdown';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    AttributeGroupComponent,
    ActiveGroupComponent,
    DeletedGroupComponent,
    UpdateAttributeGroupComponent,
    AttributePositionComponent,
  ],
  imports: [
    CommonModule,
    AttributeGroupRoutingModule,
    ThemeModule,
    SharedLazyModule,
    SelectDropDownModule,
    FileUploadModule,
  ],
  providers: [
    AttributeGroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class AttributeGroupModule {
  constructor() {
    // selecting multiple attributes on search
    const origSelectItem = SelectDropDownComponent.prototype.selectItem;
    SelectDropDownComponent.prototype.selectItem = function(item) {
      const index = this.availableItems.indexOf(item);
      origSelectItem.call(this, item, index);
    };
  }
}
