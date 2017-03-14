import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CropperJSDemoApp } from './app.component';
import { CropImageModal } from '../modals/crop-image/crop-image';
import { HomePage } from '../pages/home/home';
import { Imaging } from '../providers/imaging';

@NgModule({
  declarations: [
    CropperJSDemoApp,
    CropImageModal,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(CropperJSDemoApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CropperJSDemoApp,
    CropImageModal,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Imaging]
})
export class AppModule {}
