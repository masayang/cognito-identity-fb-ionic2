import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { FacebookService } from '../providers/facebook/facebook-service';
import { CONST } from '../providers/commons/const-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
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
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
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
    console.log("Enter app.facebookLogin");
    this.fbService.facebookLogin().then(() => {
      console.log('FB Login Done');
      this.nav.setRoot(HomePage);
    }).catch((err) => {
      console.log(err);
    })
  }

  facebookLogout() {
    console.log("Enter app.facebookLogout");
    this.fbService.facebookLogout().then(() => {
      console.log('FB Logout Done');
      this.nav.setRoot(HomePage);
    }).catch((err) => {
      console.log(err);
    })
  }

  listenToLoginEvents() {
    this.events.subscribe(CONST.FB_LOGIN_EVENT, () => {
      console.log("Received FB_LOGIN_EVENT");
      this.getUserInfo();
      this.enableMenu(true);
    });

    this.events.subscribe(CONST.FB_LOGOUT_EVENT, () => {
      console.log("Received FB_LOGOUT_EVENT");
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
      console.log("User Info=", data);
      this.userInfo = data;
    })
    .catch((err) => {
      console.log("Error at getUserInfo:", err)
    })
  }
}
