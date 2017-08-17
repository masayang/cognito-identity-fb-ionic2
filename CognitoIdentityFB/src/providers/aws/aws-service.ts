import { Injectable } from '@angular/core';
import { CognitoUtil } from "../cognito/cognito-service";
import { MyConfig } from "../commons/my-config";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONST } from '../../providers/commons/const-service';

declare let AWS: any;

@Injectable()
export class AWSService {
  facebookToken: string;
  constructor(public cognitoUtil: CognitoUtil, public http: Http) {
  }

  setFacebookToken(token: string) {
    this.facebookToken = token;
    AWS.config.update({ region: MyConfig.AWS.REGION });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      'AccountId': MyConfig.AWS.ACCOUNTID,
      'IdentityPoolId': MyConfig.AWS.COGNITO.IDENTITY_POOL_ID,
      'Logins': {
        'graph.facebook.com': token
      }
    });

    AWS.config.credentials.get((err) => {
      if (err)
        console.log("Error at AWSService.setFacebookToken() ", err);
    })
  }

  callGuestHello() {
    return new Promise((resolve, reject) => {
      AWS.config.credentials.get((err) => {
        if (err)
        console.log("Error at AWSService.callGuestHello() ", err);
        let result: any = {};
        //  http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-input
        let headers = new Headers()
        headers.append('Authorization', 'Bearer ' + this.facebookToken);
        let options = new RequestOptions({ headers: headers });
        let url: string = MyConfig.Server.BaseUrl + CONST.Paths.GuestPath;
        this.http.get(url, options).map(res => res.json()).subscribe(
          data => {
            result = data;
            resolve(result);
          },
          err => {
            reject(err);
          })
      })
    })
  }
  callAuthorizedHello() {
    return new Promise((resolve, reject) => {
      AWS.config.credentials.get((err) => {
        if (err)
          console.log("Error at credentials", err);
        let result: any = {};
        let headers = new Headers()
        headers.append('Authorization', 'Bearer ' + this.facebookToken);
        let options = new RequestOptions({ headers: headers });
        let url: string = MyConfig.Server.BaseUrl + CONST.Paths.RestrictedPath;
        this.http.get(url, options).map(res => res.json()).subscribe(
          data => {
            result = data;
            resolve(result);
          },
          err => {
            reject(err);
          })
      })
    })
  }
}