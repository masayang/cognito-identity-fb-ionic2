import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AWSService } from '../../providers/aws/aws-service';

@Component({
  selector: 'page-restricted',
  templateUrl: 'restricted.html'
})

export class RestrictedPage {
  result: any = {};

  constructor(public navCtrl: NavController, public aws: AWSService) {
  }

  callAuthorizedHello() {
    this.result = {};
    this.aws.callAuthorizedHello()
      .then(result => {
        this.result = result;
      })
      .catch(err => {
        console.log("Error at pages.restricted.restricted.callAuthorizedHello()", err);
        this.result.greeting = "Error";
        this.result.message = "Not Authorized"
      })
  }
}
