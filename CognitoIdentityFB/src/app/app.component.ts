import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OpenPage } from '../pages/open/open';
import { RestrictedPage } from '../pages/restricted/restricted';

import { FacebookService } from '../providers/facebook/facebook-service';
import { CONST } from '../providers/commons/const-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = OpenPage;
  userInfo: any = null;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fbService: FacebookService,
    public events: Events,
    public menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Opened', component: OpenPage },
      { title: 'Restricted', component: RestrictedPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenToLoginEvents();
      this.fbService.getFacebookLoginStatus();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  facebookLogin() {
    this.fbService.facebookLogin().then(() => {
      this.nav.setRoot(OpenPage);
    }).catch((err) => {
      console.log("Error in app.component.facebookLogin()", err);
    })
  }

  facebookLogout() {
    this.fbService.facebookLogout().then(() => {
      this.nav.setRoot(OpenPage);
    }).catch((err) => {
      console.log("Error in app.component.facebookLogout()", err);
    })
  }

  listenToLoginEvents() {
    this.events.subscribe(CONST.FB_LOGIN_EVENT, () => {
      this.getUserInfo();
      this.enableMenu(true);
    });

    this.events.subscribe(CONST.FB_LOGOUT_EVENT, () => {
      this.enableMenu(false);
    })
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  getUserInfo() {
    this.fbService.getUserInfo()
    .then((data) => {
      this.userInfo = data;
    })
    .catch((err) => {
      console.log("Error in app.component.getUserInfo()", err);
    })
  }
}
