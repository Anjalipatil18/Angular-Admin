import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPrivacyComponent } from './components/user-privacy/user-privacy.component';
import { PromoterPrivacyComponent } from './components/promoter-privacy/promoter-privacy.component';

@NgModule({
  declarations: [
    PrivacyComponent,
    UserPrivacyComponent,
    PromoterPrivacyComponent,
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    PrivacyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
})
export class PrivacyModule {}
