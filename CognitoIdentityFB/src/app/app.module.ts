import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { OpenPage } from '../pages/open/open';
import { RestrictedPage } from '../pages/restricted/restricted';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FacebookService } from '../providers/facebook/facebook-service';
import { Facebook } from '@ionic-native/facebook';
import { EventsService } from "../providers/commons/events-service";
import { CognitoUtil } from "../providers/cognito/cognito-service";
import { AWSService } from "../providers/aws/aws-service";

@NgModule({
  declarations: [
    MyApp,
    OpenPage,
    RestrictedPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OpenPage,
    RestrictedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookService,
    Facebook,
    EventsService,
    CognitoUtil,
    AWSService
  ]
})
export class AppModule {}
