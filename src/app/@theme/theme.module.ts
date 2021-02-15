import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from '../auth/interceptor/interceptor.config';
import { LoginService } from '../auth/services/login.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbListModule,
  NbToastrModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
} from '@nebular/theme';

// import { NbSecurityModule } from '@nebular/security';

import { HeaderComponent } from './components/header/header.component';

import { NbEvaIconsModule } from '@nebular/eva-icons';
// import {
//   CapitalizePipe,
//   PluralPipe,
//   RoundPipe,
//   TimingPipe,
//   NumberWithCommasPipe,
//   EvaIconsPipe,
// } from './pipes';
// import {
//   OneColumnLayoutComponent,
//   SampleLayoutComponent,
//   ThreeColumnsLayoutComponent,
//   TwoColumnsLayoutComponent,
// } from './layouts';
// import { DEFAULT_THEME } from './styles/theme.default';
// import { COSMIC_THEME } from './styles/theme.cosmic';
// import { CORPORATE_THEME } from './styles/theme.corporate';

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  HttpClientModule,
  NgxSpinnerModule,
  NgxDatatableModule,
  LazyLoadImageModule,
  ImageCropperModule,
];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  //   NgbModule,
  //   NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbToastrModule,
  NbInputModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
  NbEvaIconsModule,
];

const COMPONENTS = [
  //   SwitcherComponent,
  //   LayoutDirectionSwitcherComponent,
  //   ThemeSwitcherComponent,
  //   ThemeSwitcherListComponent,
  HeaderComponent,
  //   FooterComponent,
  //   SearchInputComponent,
  //   ThemeSettingsComponent,
  //   TinyMCEComponent,
  //   OneColumnLayoutComponent,
  //   SampleLayoutComponent,
  //   ThreeColumnsLayoutComponent,
  //   TwoColumnsLayoutComponent,
  //   ToggleSettingsButtonComponent,
  // ];

  // const ENTRY_COMPONENTS = [
  //   ThemeSwitcherListComponent,
  // ];

  // const PIPES = [
  //   CapitalizePipe,
  //   PluralPipe,
  //   RoundPipe,
  //   TimingPipe,
  //   NumberWithCommasPipe,
  //   EvaIconsPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot({
    name: 'default',
  }).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbToastrModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  //   entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    } as ModuleWithProviders;
  }
}
