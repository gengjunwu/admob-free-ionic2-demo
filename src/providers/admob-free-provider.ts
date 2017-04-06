import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import 'rxjs/add/operator/map';

@Injectable()
export class AdmobFreeProvider {

  private admobId;
  private bannerPrepared: boolean = false;
  private interstitialPrepared: boolean = false;
  public bannerConfig: AdMobFreeBannerConfig;
  public bannerSizes = [
    {
      android: {
        BANNER: 'BANNER',
        IAB_BANNER: 'IAB_BANNER',
        IAB_LEADERBOARD: 'IAB_LEADERBOARD',
        IAB_MRECT: 'IAB_MRECT',
        LARGE_BANNER: 'LARGE_BANNER',
        SMART_BANNER: 'SMART_BANNER',
        FLUID: 'FLUID',
        FULL_BANNER: 'FULL_BANNER',
        LEADERBOARD: 'LEADERBOARD',
        MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
        SEARCH: 'SEARCH',
        WIDE_SKYSCRAPER: 'WIDE_SKYSCRAPER'
      }
    },
    {
      ios: {
        BANNER: 'BANNER',
        IAB_BANNER: 'IAB_BANNER',
        IAB_LEADERBOARD: 'IAB_LEADERBOARD',
        IAB_MRECT: 'IAB_MRECT',
        LARGE_BANNER: 'LARGE_BANNER',
        SMART_BANNER: 'SMART_BANNER',
        FLUID: 'FLUID'
      }
    }
  ];
  public interstitialConfig: AdMobFreeInterstitialConfig;


  constructor(private platform: Platform, private admobFree: AdMobFree, private alertCtrl: AlertController) {
    console.log('Hello AdmobFree Provider');
    this.platform.ready().then(() => {
      // For Android
      if(platform.is('android')) {
        this.admobId = {
          banner: 'ca-app-pub-5764598489193881/1782118056',
					interstitial: 'ca-app-pub-5764598489193881/3258851252'
        };
      }

      // For iOS
      if(platform.is('ios')) {
        this.admobId = {
					banner: 'ca-app-pub-5764598489193881/2700448056',
					interstitial: 'ca-app-pub-5764598489193881/5653914453'
		    };
      }

      this.init();
    });
  }

  // Initialise AdMob Free
  init() {
    console.log("AdMob initialising");
  	if(!this.admobFree) {
  		console.log("No AdMob?");
  		return;
  	}

   	// Subscribe to AdMob banner events
    this.admobFree.on('BANNER_LOAD').subscribe(() => {
      console.log('BANNER_LOAD');
    });
    this.admobFree.on('BANNER_LOAD_FAIL').subscribe(() => {
      console.log('BANNER_LOAD_FAIL');
    });
    this.admobFree.on('BANNER_OPEN').subscribe(() => {
      console.log('BANNER_OPEN');
    });
    this.admobFree.on('BANNER_CLOSE').subscribe(() => {
      console.log('BANNER_CLOSE');
    });
    this.admobFree.on('BANNER_EXIT_APP').subscribe(() => {
      console.log('BANNER_EXIT_APP');
    });

    // Subscribe to AdMob interstitial events
    this.admobFree.on('INTERSTITIAL_LOAD').subscribe(() => {
      console.log('INTERSTITIAL_LOAD');
    });
    this.admobFree.on('INTERSTITIAL_LOAD_FAIL').subscribe(() => {
      console.log('INTERSTITIAL_LOAD_FAIL');
    });
    this.admobFree.on('INTERSTITIAL_OPEN').subscribe(() => {
      console.log('INTERSTITIAL_OPEN');
    });
    this.admobFree.on('INTERSTITIAL_CLOSE').subscribe(() => {
      console.log('INTERSTITIAL_CLOSE');
    });
    this.admobFree.on('INTERSTITIAL_EXIT_APP').subscribe(() => {
      console.log('INTERSTITIAL_EXIT_APP');
    });

    // Initialise other default config options
    this.bannerConfig = {
      overlap: true, // Set the banner overlap the webview, it has bug that need to be fixed.
      // offsetTopBar: true, // For iOS 7 status bar overlap, if this happens, you need to set it to true.
      isTesting: true
    }
    this.admobFree.banner.config(this.bannerConfig);
    this.interstitialConfig = {
      isTesting: true
    }
    this.admobFree.interstitial.config(this.interstitialConfig);
  }

  prepareBanner(): Promise<any> {
    this.bannerConfig.id = this.admobId.banner;
    this.admobFree.banner.config(this.bannerConfig);
    return this.admobFree.banner.prepare()
    .then(() => {
      this.bannerPrepared = true;
      console.log('AdMob Banner Ad is prepared, will be presented if autoShow is true, otherwise, call showBanner().');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  showBanner() {
    if(this.bannerConfig.autoShow) {
      this.prepareBanner()
      .then(() => {
        this.bannerPrepared = false;
      });
    } else if(this.bannerPrepared) {
      this.admobFree.banner.show()
      .then(() => {
        this.bannerPrepared = false;
        console.log('Banner Ad is successfully shown.');
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Banner Ad Error',
        message: 'The Prepare Banner button needs to be clicked first.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  hideBanner() {
    this.admobFree.banner.hide()
    .then(() => {
      this.bannerPrepared = true;
      console.log('Banner Ad is successfully hidden.');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  removeBanner() {
    this.admobFree.banner.remove()
    .then(() => {
      this.bannerPrepared = false;
      console.log('Banner Ad is successfully removed.');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  prepareInterstitial(): Promise<any> {
    this.interstitialConfig.id = this.admobId.interstitial;
    this.admobFree.interstitial.config(this.interstitialConfig);
    return this.admobFree.interstitial.prepare()
    .then(() => {
      this.interstitialPrepared = true;
      console.log('AdMob Interstitial Ad is prepared, will be presented if autoShow is true, otherwise, call showInterstitial().');
    })
    .catch((err) => {
      console.error(err);
    })
  }

  showInterstitial() {
    if(this.interstitialConfig.autoShow) {
      this.prepareInterstitial()
      .then(() => {
        this.interstitialPrepared = false;
      });
    } else if(this.interstitialPrepared) {
      this.admobFree.interstitial.show()
      .then(() => {
        this.interstitialPrepared = false;
        console.log('Interstitial Ad is successfully shown.');
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Interstitial Ad Error',
        message: 'The Prepare Interstitial button needs to be clicked first.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}