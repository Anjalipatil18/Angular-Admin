import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { FaqDataRoutingModule } from './faq-data-routing.module';
import { FaqDataComponent } from './faq-data.component';
import { FaqCategoryComponent } from './components/faq-category/faq-category.component';
import { FaqSubcategoryComponent } from './components/faq-subcategory/faq-subcategory.component';

import { FaqUpdatecategoryComponent } from './components/faq-updatecategory/faq-updatecategory.component';
import { FaqEditViewComponent } from './components/seller-editView/seller-editView.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill';

import { FaqService } from './../service/faq.service';

@NgModule({
  declarations: [
    FaqDataComponent,
    FaqCategoryComponent,
    FaqSubcategoryComponent,
    FaqUpdatecategoryComponent,
    FaqEditViewComponent,
  ],
  imports: [
    CommonModule,
    FaqDataRoutingModule,
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
    FaqService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
})
export class FaqDataModule {}
