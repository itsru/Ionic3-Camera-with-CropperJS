/*!
 * Demo of Cropper.js v1.3.1  with Ionic v3
 * https://github.com/itsru/Ionic3-Camera-with-CropperJS
 *
 * Copyright (c) 2018 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2018-02-28
 */
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, Platform } from 'ionic-angular';
import { Imaging } from '../../providers/imaging';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('fileInput') fileInput;
  image:any;
  width:number = 500;
  height:number = 500;
  quality:number = 90;
  useCropperJS:boolean = true;
  constructor(public platform: Platform, public navCtrl: NavController, public imaging: Imaging, public toastCtrl: ToastController, public modalCtrl: ModalController) {}

  addPhoto(event){
    if (Camera['installed']()) {
    //Add Photo options (Image Width(px), Image Height(px), Quality(0-100 number) Crop Image With CropperJS(boolean))
    this.imaging.getImage(this.width, this.height, this.quality, this.useCropperJS).subscribe(data => this.image = data, error =>
      {
        // Toast errot and return DEFAULT_PHOTO from Constants
        this.toast(error);
      });
    } else {
      // Call native browser file upload
      this.fileInput.nativeElement.click();
    }
  }


  captureWebImage(event:readerEvent) {
    let imageData: string = null;
    let reader = new FileReader();

    reader.onload = (readerEvent) => {
      imageData = (readerEvent.target as any).result;
      if(this.useCropperJS){
        this.imaging.cropImage(imageData, this.width, this.height).subscribe(croppedImage => {
          // Handle image after crop
          this.image = croppedImage;
        }, error=> {
          //Handle cropper abort
         });
      }
      else { this.image = imageData; };
    };

    reader.onabort = function() {
      // Handle browser file upload abort
      this.image = "";
    };
    reader.readAsDataURL(event.target.files[0]);
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
