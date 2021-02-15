import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedLazyModule } from 'src/app/shared/shared-lazy.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from 'src/app/auth/interceptor/interceptor.config';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents.component';
import { AgentsCategoryComponent } from './components/agents-category/agents-category.component';
import { AgentsSubcategoryComponent } from './components/agents-subcategory/agents-subcategory.component';
import { AgentsUpdatecategoryComponent } from './components/agents-updatecategory/agents-updatecategory.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SupportTextService } from './../service/support-text.service';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AgentsComponent,
    AgentsCategoryComponent,
    AgentsSubcategoryComponent,
    AgentsUpdatecategoryComponent,
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    HttpClientModule,
    ThemeModule,
    SharedLazyModule,
    CKEditorModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, false] }],
          [{ color: [] }, { background: [] }],
          ['link', 'image', 'video'],
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
export class AgentsModule {}
