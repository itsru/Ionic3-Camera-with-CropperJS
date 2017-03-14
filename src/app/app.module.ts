import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CropperJSDemoApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    CropperJSDemoApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(CropperJSDemoApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CropperJSDemoApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
