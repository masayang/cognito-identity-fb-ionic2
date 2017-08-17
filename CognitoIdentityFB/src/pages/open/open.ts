import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AWSService } from '../../providers/aws/aws-service';

@Component({
  selector: 'page-open',
  templateUrl: 'open.html'
})

export class OpenPage {
  result: any = {};

  constructor(public navCtrl: NavController, public aws: AWSService) {
  }

  callGuestHello() {
    this.result = {};
    this.aws.callGuestHello()
      .then(result => { this.result = result })
      .catch(err => {
        console.log("Error at pages.open.callGuestHello()", err)
      })
  }
}
