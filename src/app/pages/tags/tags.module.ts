import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

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

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { ActiveTagsComponent } from './components/active-tags/active-tags.component';
import { DeletedTagsComponent } from './components/deleted-tags/deleted-tags.component';
import { DeactivatedTagsComponent } from './components/deactivated-tags/deactivated-tags.component';
import { SuspendedTagsComponent } from './components/suspended-tags/suspended-tags.component';
import { ReportedTagsComponent } from './components/reported-tags/reported-tags.component';
import { TagsService } from './components/service/tags.service';
import { TagsViewsComponent } from './components/inner-page/tags-views/tags-views.component';
import { TagsLikesComponent } from './components/inner-page/tags-likes/tags-likes.component';
import { UsertagsDialogComponent } from './components/inner-page/usertags-dialog/usertags-dialog.component';
import { TagsAddComponent } from './components/inner-page/tags-add/tags-add.component';

import { TagsUserdetailsComponent } from './components/inner-page/tags-userdetails/tags-userdetails.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TagsCommentsComponent } from './components/inner-page/tags-comments/tags-comments.component';

// select with search option
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// NPM Chips modlue
import { TagInputModule } from 'ngx-chips';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ActiveCommentsComponent } from './components/inner-page/tags-comments/components/active-comments/active-comments.component';
import { DeleteCommentsComponent } from './components/inner-page/tags-comments/components/delete-comments/delete-comments.component';

const ENTRY_COMPONENT = [UsertagsDialogComponent];

@NgModule({
  declarations: [
    TagsComponent,
    ActiveTagsComponent,
    DeletedTagsComponent,
    DeactivatedTagsComponent,
    SuspendedTagsComponent,
    ReportedTagsComponent,
    TagsViewsComponent,
    TagsLikesComponent,
    UsertagsDialogComponent,
    TagsAddComponent,
    TagsUserdetailsComponent,
    TagsCommentsComponent,
    ActiveCommentsComponent,
    DeleteCommentsComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
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
    TagInputModule,
    DropDownListModule,
    DatePickerModule,
  ],
  providers: [
    TagsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  entryComponents: [...ENTRY_COMPONENT],
})
export class TagsModule {}
