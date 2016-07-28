import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';

@Page({
    templateUrl: 'build/pages/general/general.html',
})
export class GeneralPage {
    event: Observable<Event> |Event;
    observable_event : boolean;
    constructor(public nav: NavController, private _navParams: NavParams) {
        var event = this._navParams.get('event');
        this.observable_event = event instanceof Subject;
        if(event instanceof Subject){
          this.event = event.asObservable();
        }
        else{
          this.event = event;
        }
    }
}
