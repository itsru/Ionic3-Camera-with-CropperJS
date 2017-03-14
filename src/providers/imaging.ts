/*!
 * Demo of Cropper.js v1.0.0-Beta2 with Ionic v2.2.1
 * https://github.com/itsru/Ionic2-Camera-with-CropperJS
 *
 * Copyright (c) 2017 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2017-03-13
 */
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { CropImageModal } from '../modals/crop-image/crop-image';

@Injectable()
export class Imaging {
  constructor(public platform: Platform, public alertCtrl: AlertController, public modalCtrl: ModalController) { }

  getImage(width: number, height: number, quality: number, useCropperJS: boolean) {
    return Observable.create(observer => {
      //Set default options for taking an image with the camera
      let imageOptions: any = {
        quality: quality,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: 1,
        saveToPhotoAlbum: false,
        mediaType: Camera.MediaType.PICTURE,
        cameraDirection: 1
      };

      let selectAlert = this.alertCtrl.create({
        title: 'Let\'s add a picture!',
        message: "Select how you would like to add the picture",
        enableBackdropDismiss: false,
        buttons: [{
          text: 'Albums',
          handler: data => {
            //Change sourceType to PHOTOLIBRARY
            imageOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            selectAlert.dismiss();
          }
        }, {
            text: 'Camera',
            handler: data => {
              selectAlert.dismiss();
            }
          }]
      });

      //onDismiss handle image and call crop if requested
      selectAlert.onDidDismiss(() => {
        this.getCameraImage(imageOptions).subscribe(image => {
          if (useCropperJS) {
            let cropModal = this.modalCtrl.create(CropImageModal, { "imageBase64": image, "width": width, "height": height });
            cropModal.onDidDismiss((croppedImage: any) => {
              if (!croppedImage)
                observer.error("Canceled while cropping.")
              else {
                observer.next(croppedImage);
                observer.complete();
              }
            });
            cropModal.present();
          }
          else {
            observer.next(image);
            observer.complete();
          }
        }, error => observer.error(error));
      });
      selectAlert.present();
    });
  }

  getCameraImage(options: any) {
    return Observable.create(observer => {
      this.platform.ready().then(() => {
        Camera.getPicture(options).then((imageData: any) => {
          // imageData is a base64 encoded string as per options set above
          let base64Image: string = "data:image/jpeg;base64," + imageData;
          observer.next(base64Image);
          observer.complete();
        }, error => {
          observer.error(error);
        });
      });
    });
  }

}
