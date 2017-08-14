import {Injectable} from "@angular/core";
import {Events} from "ionic-angular/index";
import { CONST } from './const-service';

@Injectable()
export class EventsService {
    constructor(public events: Events) {
    }

    sendFacebookLoggedInEvent() {
        console.log("Publishing FB Login Event");
        this.events.publish(CONST.FB_LOGIN_EVENT);
    }

    sendFacebookLoggedOutEvent() {
        console.log("Publishing FB Logout Event");
        this.events.publish(CONST.FB_LOGOUT_EVENT);
    }
}