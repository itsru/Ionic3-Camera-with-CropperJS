//Modules
import { IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

//Pages
import { HomePage } from '../pages/home/home';

//Modals
import { CropImageModal } from '../modals/crop-image/crop-image';

//Providers
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Imaging } from '../providers/imaging';

// Ionic native providers
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from "@ionic-native/camera";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


export const PAGES = [
  HomePage
];

export const MODALS = [
  CropImageModal
];

export const MODULES = [
  IonicModule,
  BrowserModule
];

export const PROVIDERS = [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  Imaging,

  //Ionic native specific providers
  StatusBar, SplashScreen, Camera, AndroidPermissions
];
