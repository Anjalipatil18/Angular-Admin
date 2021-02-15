import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';
import {
  NbDialogModule,
  NbWindowModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng5SliderModule } from 'ng5-slider';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { SearchTagsRoutingModule } from './search-tags-routing.module';
import { SearchTagsPageComponent } from './components/search-tags-page/search-tags-page.component';
import { SearchTagAddComponent } from './components/inner-page/search-tag-add/search-tag-add.component';
import { SearchTagEditComponent } from './components/inner-page/search-tag-edit/search-tag-edit.component';

import { SearchtagService } from './components/service/searchtag.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchTagsComponent } from './search-tags.component';

const ENTRY_COMPONENT = [];

@NgModule({
  declarations: [
    SearchTagsPageComponent,
    SearchTagAddComponent,
    SearchTagEditComponent,
    SearchTagsComponent,
  ],
  imports: [
    CommonModule,
    SearchTagsRoutingModule,
    CommonModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    UiSwitchModule,
    Ng5SliderModule,
    // ImageCropperModule,
    FlatpickrModule.forRoot(),
    SelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    SearchtagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class SearchTagsModule {}
