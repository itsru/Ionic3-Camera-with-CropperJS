# Ionic 2 with Camera or Album Select and CropperJS

### Installation & Development

1. clone this repo: `git clone git@github.com:itsru/Ionic2-Camera-with-CropperJS.git`
2. `cd Ionic2-Camera-with-CropperJS`
3. `npm install`
4. Add your platform `ionic platform add Android` or `ionic platform add ios`
5. run `ionic run android` or `ionic run ios` from a terminal

### Purpose

This app is to demo the utilization of Camera or Album select and utilization of a CropperJS View.

### Known issues at the time of development

Known iOS resource limits: As iOS devices limit memory, the browser may crash when you are cropping a large image (iPhone camera resolution). To avoid this, you may resize the image first (below 1024px) before start a cropper.

### Additional Links and Resources

Ionic - http://ionicframework.com/

CropperJS - https://github.com/fengyuanchen/cropper
