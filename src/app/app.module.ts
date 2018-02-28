import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CropperJSDemoApp } from './app.component';
import { PAGES, MODALS, PROVIDERS, MODULES } from './app.imports';

@NgModule({
  declarations: [
    CropperJSDemoApp,
    PAGES,
    MODALS
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(CropperJSDemoApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CropperJSDemoApp,
    PAGES,
    MODALS
  ],
  providers: [
    PROVIDERS
  ]
})
export class AppModule {}
