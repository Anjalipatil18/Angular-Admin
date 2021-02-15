import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsLogsComponent } from './components/sms-logs/sms-logs.component';
import { EmailLogsComponent } from './components/email-logs/email-logs.component';
const routes: Routes = [
  {
    path: 'sms-logs',
    component: SmsLogsComponent,
    data: {
      title: 'SMS Logs',
      breadcrumb: [
        {
          label: 'SMS Logs',
          url: 'sms-logs',
        },
      ],
    },
  },
  {
    path: 'email-logs',
    component: EmailLogsComponent,
    data: {
      title: 'Email Logs',
      breadcrumb: [
        {
          label: 'Email Logs',
          url: 'email-logs',
        },
      ],
    },
  },
  { path: '', redirectTo: 'sms-logs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsRoutingModule {}
