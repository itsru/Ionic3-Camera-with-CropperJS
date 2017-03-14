/*!
 * Demo of Cropper.js v1.0.0-Beta2 with Ionic v2.2.1
 * https://github.com/itsru/Ionic2-Camera-with-CropperJS
 *
 * Copyright (c) 2017 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2017-03-13
 */
import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { Imaging } from '../../providers/imaging';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  image:any;
  width:number = 500;
  height:number = 500;
  quality:number = 90;
  useCropperJS:boolean = true;
  constructor(public navCtrl: NavController, public imaging: Imaging, public toastCtrl: ToastController, public modalCtrl: ModalController) {}

  addPhoto(){
    //Add Photo options (Image Width(px), Image Height(px), Quality(0-100 number) Crop Image With CropperJS(boolean))
    this.imaging.getImage(this.width, this.height, this.quality, this.useCropperJS).subscribe(data => this.image = data, error =>
      {
        // Toast errot and return DEFAULT_PHOTO from Constants
        this.toast(error);
      });
  }

  toast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500,
      showCloseButton: false
    });
    toast.present();
  }


}
