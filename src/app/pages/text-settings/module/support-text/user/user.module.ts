import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserCategoryComponent } from './components/user-category/user-category.component';
import { UserSubcategoryComponent } from './components/user-subcategory/user-subcategory.component';

import { UserUpdatecategoryComponent } from './components/user-updatecategory/user-updatecategory.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill';

import { SupportTextService } from './../service/support-text.service';

@NgModule({
  declarations: [
    UserComponent,
    UserCategoryComponent,
    UserSubcategoryComponent,
    UserUpdatecategoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    CKEditorModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic'], // toggled buttons
          // custom button values
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ header: [1, 2, 3, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          // [{ 'font': [] }],
          // [{ 'align': [] }],
          // ['clean'],                                         // remove formatting button
          ['link', 'image', 'video'], // link and image, video
        ],
      },
    }),
  ],
  providers: [
    SupportTextService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class UserModule {}
