/*!
 * Demo of Cropper.js v1.3.1 with Ionic v3
 * https://github.com/itsru/Ionic3-Camera-with-CropperJS
 *
 * Copyright (c) 2018 Ru Selvadurai
 * Released under the MIT license
 *
 * Date: 2018-02-28
 */
import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { CropImageModal } from '../modals/crop-image/crop-image';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Injectable()
export class Imaging {
  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController, private androidPermissions: AndroidPermissions, public camera: Camera, public platform: Platform) { }

  getImage(width: number, height: number, quality: number, useCropperJS: boolean) {
    return Observable.create(observer => {
        //Set default options for taking an image with the camera
        let imageOptions: CameraOptions = {
          quality: quality,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          encodingType: this.camera.EncodingType.JPEG,
          correctOrientation: true,
          saveToPhotoAlbum: false,
          mediaType: this.camera.MediaType.PICTURE,
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
              imageOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
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
              this.cropImage(image, width, height).subscribe(croppedImage => {
                observer.next(croppedImage);
                observer.complete();
              }, error => {
                observer.error("Canceled while cropping.");
              });
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
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          success => {
            this.camera.getPicture(options).then((imageData: any) => {
              // imageData is a base64 encoded string as per options set above
              let base64Image: string = "data:image/jpeg;base64," + imageData;
              observer.next(base64Image);
              observer.complete();
            }, error => {
              observer.error(error);
            });
          },
          err => {
            this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.CAMERA);
            observer.error("Try again");
          }
        );
      });
    });
  }

  cropImage(image: string, width: number, height: number) {
    return Observable.create(observer => {
      let cropModal = this.modalCtrl.create(CropImageModal, { "imageBase64": image, "width": width, "height": height });
      cropModal.onDidDismiss((croppedImage: any) => {
        if (!croppedImage)
          observer.error("Canceled while cropping.");
        else {
          // observer.next(this.decodeFromBase64(croppedImage));
          observer.next(croppedImage);
          observer.complete();
        }
      });
      cropModal.present();
    });
  }

}
