import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AdmobFreeProvider } from '../../providers/admob-free-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public bannerSize: any;
  public bannerSizeOpts = {};
  public bannerAtTop: boolean = false;
  public bannerOverlap: boolean = true;
  public adAutoShow: boolean = false;
  public keys;

  constructor(public navCtrl: NavController, private platform: Platform, private admobFree: AdmobFreeProvider) {
    //console.log(this.admobFree.bannerSizes[0]['android']);
    this.platform.ready().then(() => {
      if(this.platform.is('android')) {
        this.bannerSizeOpts = this.admobFree.bannerSizes[0]['android'];
      } else if(this.platform.is('android')) {
        this.bannerSizeOpts = this.admobFree.bannerSizes[1]['ios'];
      }
      this.keys = Object.keys(this.bannerSizeOpts);
    });
  }

  prepareBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    this.admobFree.prepareBanner();
    console.log('prepareBanner() called.');
  }

  showBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    this.admobFree.showBanner();
    console.log('showBanner() called.');
  }

  hideBanner() {
    this.admobFree.hideBanner();
    console.log('hideBanner() called.');
  }

  removeBanner() {
    this.admobFree.removeBanner();
    console.log('removeBanner() called.');
  }

  prepareInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.prepareInterstitial();
    console.log('prepareInterstitial() called.');
  }

  showInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.showInterstitial();
    console.log('showInterstitial() called.');
  }
}