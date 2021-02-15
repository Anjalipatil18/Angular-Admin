import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ThemeModule } from './@theme/theme.module';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  CloudinaryModule,
  CloudinaryConfiguration,
  provideCloudinary,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { DeviceDetectorModule } from 'ngx-device-detector';
// import { NbEvaIconsModule } from '@nebular/eva-icons';

export const cloudinaryLib = {
  Cloudinary,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule,
    FileUploadModule,
    // NbEvaIconsModule,
    DeviceDetectorModule.forRoot(),
    CloudinaryModule.forRoot(cloudinaryLib, {
      cloud_name: 'a-mil-por-hora-sl',
      api_key: '514647771579974',
      api_secret: 'VxkenEzsz3mNpomm7mw7Y_wpYKg',
      upload_preset: 'xqkdbqea',
    } as CloudinaryConfiguration),

    // ThemeModule.forRoot(),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
