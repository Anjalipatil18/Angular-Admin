import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'language',
    loadChildren: './module/language/language.module#LanguageModule',
    data: {
      title: 'Language',
      breadcrumb: [
        {
          label: 'Language',
          url: 'text-settings/language',
        },
      ],
    },
  },
  {
    path: 'report-reasons',
    loadChildren:
      './module/report-reasons/report-reasons.module#ReportReasonsModule',
  },
  {
    path: 'support-text',
    loadChildren: './module/support-text/support-text.module#SupportTextModule',
  },
  {
    path: 'faq',
    loadChildren: './module/faq/faq.module#FaqModule',
  },

  { path: '', redirectTo: 'language', pathMatch: 'full' },

  {
    path: 'privacy',
    loadChildren: './module/privacy/privacy.module#PrivacyModule',
  },

  {
    path: 'terms',
    loadChildren: './module/terms/terms.module#TermsModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextSettingsRoutingModule {}
