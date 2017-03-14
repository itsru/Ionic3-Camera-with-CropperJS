/*!
 * Demo of Cropper.js v1.0.0-Beta2 with Ionic v2.2.1
 * https://github.com/itsru/Ionic2-Camera-with-CropperJS
 *
 * Copyright (c) 2017 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2017-03-13
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import Cropper from 'cropperjs';

@Component({
  selector: 'crop-image',
  templateUrl: 'crop-image.html'
})
export class CropImageModal {
  @ViewChild('image') input: ElementRef;
  imageBase64: any;
  width: number;
  height: number;
  quality: number;
  cropper: Cropper;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.imageBase64 = this.navParams.get("imageBase64");
    this.width = this.navParams.get("width");
    this.height = this.navParams.get("height");
    this.quality = ((this.navParams.get("quality") > 100) || (this.navParams.get("quality") < 1)) ? 100 : this.navParams.get("quality");
  }

  cropperLoad() {
    //Set your required cropperJS options as seen here https://github.com/fengyuanchen/cropperjs/blob/master/README.md#options
    this.cropper = new Cropper(this.input.nativeElement, {
      dragMode: 'crop',
      aspectRatio: this.width / this.height,
      modal: true,
      guides: true,
      highlight: true,
      center: true,
      background: false,
      autoCrop: true,
      movable: false,
      zoomable: false,
      autoCropArea: 1,
      responsive: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      scalable: false,
      crop: (e: Cropper.CropperCustomEvent) => {}
    });
  }

  cropperReset() { this.cropper.reset() }

  imageRotate() { this.cropper.rotate(90); }

  cancel() { this.viewCtrl.dismiss(); }

  finish() {
    let croppedImgB64String: string = this.cropper.getCroppedCanvas({
      width: this.width,
      height: this.height
    }).toDataURL('image/jpeg', (this.quality / 100));
    this.viewCtrl.dismiss(croppedImgB64String);
  }
}
