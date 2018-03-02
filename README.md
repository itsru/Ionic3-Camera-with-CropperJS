# Ionic 3 with Camera or Album Select and CropperJS

### Pre-reqs

1. `npm i -g ionic && npm i -g cordova` (You may need to `sudo` for EACCES errors)

### Installation & Development

1. clone this repo: `git clone git@github.com:itsru/Ionic3-Camera-with-CropperJS.git`
2. `cd Ionic3-Camera-with-CropperJS`
3. `npm install`
4. Add your platform `ionic cordova platform add Android` or `ionic cordova platform add ios`
5. run `ionic cordova run android` or `ionic cordova run ios` from a terminal

### Purpose

This app is to demo the utilization of Camera or Album select and utilization of CropperJS in a modal view.

### Ionic View Demo

If you have Ionic View on your device then to view the demo use : c5286062

### Known issues at the time of development

Known iOS resource limits: As iOS devices limit memory, the browser may crash when you are cropping a large image (iPhone camera resolution). To avoid this, you may resize the image first (below 1024px) before start a cropper.

### Additional Links and Resources

Ionic - http://ionicframework.com/

CropperJS - https://github.com/fengyuanchen/cropperjs
