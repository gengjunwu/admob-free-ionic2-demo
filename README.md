# Introduction #
This repository demonstrate a quick example for using ionic native plugin for Google AdMob Free in Ionic 2 apps using Ionic v2.3.0 & Ionic Native v3.4.4.

# IMPORTANT #
The Ad unit ID used in this demo is created for testing purposes, DO NOT abuse it or use it in your production application. If you would like to get your own, please [click here](https://www.google.com/admob/).

# Issues #
* The ionic native plugin may not work in Ionic View app. If it does not work, please use simulator or real device.
* There is a bug reported [(#63)](https://github.com/ratson/cordova-plugin-admob-free/issues/63) and waiting for developer to confirm whether it is a bug. When 'overlap' configuration is set from 'true' to 'false' and back to 'true', the banner Ad does not show any more. It is currently disabled in the example until further notice.

# Get Started #
* Install Ionic 2, Cordova to your system if not installed
```
$ npm install -g cordova ionic
```

* Create a new blank Ionic 2 project and navigate to the project folder
```
$ ionic start admob-free-ionic2-demo blank --v2
$ cd admob-free-ionic2-demo
```

* Install Ionic Native Plugin
```
$ ionic plugin add cordova-plugin-admob-free
$ npm install --save @ionic-native/admob-free
```

* Generate Provider for AdMob
```
$ ionic g provider admobFreeProvider
```

# Usage Example #
* Import plugins in src/app/app.module.ts file.
```
...
import { AdMobFree } from '@ionic-native/admob-free';
import { AdmobFreeProvider } from '../providers/admob-free-provider';

@NgModule({
  ...,
  providers: [
    ...,
    AdMobFree,
    AdmobFreeProvider
  ]
})
export class AppModule {}
```

* Import plugins on top of the src/providers/admob-free-provider.ts file.
```
...
import { Platform, AlertController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
```

* Import plugins on top of the src/pages/home.ts file.
```
...
import { AdmobFreeProvider } from '../../providers/admob-free-provider';
```

* Refer to individual file for code detail.

# Run project #
* Use Ionic CLI to build project, technically, this command is for compiling the project for testing, not for building for specific platform.
```
$ ionic serve
```

* As the cordova plugin is not available for web browser, you need to either use simulator or a real device to test your app. Alternatively, you can install Ionic View app to upload it to your account at Ionic to be able to download it on your device and try it on your phone. If you have not done so, go [here](https://apps.ionic.io/signup) to register an account and download the Ionic View from App Store or Google Play. Then you can run the following command, it will ask for your credentials for your Ionic account.
```
$ ionic upload
```

* To run on the real device, you need to add platform.
```
$ ionic platform add android
$ ionic platform add ios
```

* After adding platform, run the following command to install app on real device
```
$ ionic run android
```
or
```
$ ionic run ios
```

# Contact #
* [Jacky Wu](https://www.bitmix.nz/)

# Reference #
* [Ionic 2 Framework](https://ionicframework.com/)
* [Ionic 2 AdMob Free Native Plugin](https://ionicframework.com/docs/native/admob-free/)

# Version #
* Ionic 2 v2.3.0 (2017-03-22)
* Ionic Native v3.4.4 (2017-03-30)

# System Info #
```
Cordova CLI: 6.5.0
Ionic Framework Version: 3.0.0
Ionic CLI Version: 2.2.1
Ionic App Lib Version: 2.2.0
Ionic App Scripts Version: 1.3.0
ios-deploy version: Not installed
ios-sim version: Not installed
OS: Windows 7
Node Version: v6.10.0
Xcode version: Not installed
```

# IDE #
* [Visual Studio Code v1.11.0](https://code.visualstudio.com/)

# Last Updated #
2017-Apr-06