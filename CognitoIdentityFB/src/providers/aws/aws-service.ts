import { Injectable } from '@angular/core';
import { CognitoUtil } from "../cognito/cognito-service";
import { MyConfig } from "../commons/my-config";

declare let AWS: any;

@Injectable()
export class AWSService {
    constructor(public cognitoUtil: CognitoUtil) {

    }

    setFacebookToken(token: string) {
          AWS.config.update({region: MyConfig.AWS.REGION});
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            'IdentityPoolId': MyConfig.AWS.COGNITO.IDENTITY_POOL_ID,
            'Logins': {
              'graph.facebook.com': token
            }
          });

          AWS.config.credentials.get((err) => {
            if (err)
              console.log("Error at credentials", err);
            console.log("IdentityId=", AWS.config.credentials.data.IdentityId);
            console.log("credentials=", AWS.config.credentials);
          })
        
    }
}