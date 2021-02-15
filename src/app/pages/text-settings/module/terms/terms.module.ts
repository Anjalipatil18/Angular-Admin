import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoterTermsComponent } from './components/promoter-terms/promoter-terms.component';
import { UserTermsComponent } from './components/user-terms/user-terms.component';

@NgModule({
  declarations: [TermsComponent, PromoterTermsComponent, UserTermsComponent],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    TermsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
})
export class TermsModule {}
