import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { EventsService } from "../commons/events-service";

@Injectable()
export class FacebookService {

  constructor(public eventService: EventsService, private fb: Facebook) {
    console.log('Hello FacebookLoginProvider Provider');
  }

  getFacebookLoginStatus() {
    let myThis = this;

    return new Promise((resolve, reject) => {
      this.fb.getLoginStatus().then((s) => {
        console.log("FacebookLoginStatus=", s);
        if (s.status == "connected") 
          myThis.eventService.sendFacebookLoggedInEvent();
        else
          myThis.eventService.sendFacebookLoggedOutEvent();
        resolve();
      }).catch((err) => {
        console.log("Error in getLoginStatus:", err);
        reject();
      })
    })
  }

  facebookLogin() {
    console.log("Entered facebookLogin()");
    let myThis = this;

    return new Promise((resolve, reject) => {
      this.fb.login(['public_profile'])
        .then((res: FacebookLoginResponse) => {
          console.log('Logged into Facebook!', res);
          myThis.eventService.sendFacebookLoggedInEvent();
          resolve();
        })
        .catch(e => {
          console.log('Error logging into Facebook', e)
          reject(e);
        });
    })
  }

  facebookLogout() {
    console.log("Entered facebookLogout()");
    let myThis = this;
    return new Promise((resolve, reject) => {
      this.fb.logout()
        .then(() => {
          myThis.eventService.sendFacebookLoggedOutEvent();
          resolve();
        })
        .catch(e => {
          console.log('error logging out from Facebook', e);
          reject(e);
        })
    })
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.fb.api('/me?fields=id,name,short_name', [])
      .then(data => {
        console.log("API result:", data);
        resolve(data);
      })
      .catch(err => {
        console.log("API error:", err);
        reject(err);
      })
    })
  }
}
