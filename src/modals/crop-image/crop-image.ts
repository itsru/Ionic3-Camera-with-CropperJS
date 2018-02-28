/*!
 * Demo of Cropper.js v1.3.0 with Ionic v3
 * https://github.com/itsru/Ionic3-Camera-with-CropperJS
 *
 * Copyright (c) 2018 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2018-02-28
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
  cropper: Cropper;
  cropperOptions: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.imageBase64 = this.navParams.get("imageBase64");
    this.width = this.navParams.get("width");
    this.height = this.navParams.get("height");
    this.cropperOptions = {
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
      crop: (e) => {}
    };
  }

  cropperLoad() {
    //Set your required cropperJS options as seen here https://github.com/fengyuanchen/cropperjs/blob/master/README.md#options
    this.cropper = new Cropper(this.input.nativeElement, this.cropperOptions);
  }

  cropperReset() { this.cropper.reset() }

  imageRotate() { this.cropper.rotate(90); }

  cancel() { this.viewCtrl.dismiss(); }

  finish() {
    let croppedImgB64String: string = this.cropper.getCroppedCanvas({
      maxWidth: this.width,
      maxHeight: this.height
    }).toDataURL('image/jpeg', (100 / 100));
    this.viewCtrl.dismiss(croppedImgB64String);
  }
}
