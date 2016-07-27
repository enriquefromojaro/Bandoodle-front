import {EventPage} from "../event-page/event-page";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';

/*
  Generated class for the EventListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
    templateUrl: 'build/pages/event-list/event-list.html',
})
export class EventListPage {
    private _events: Event[];
    private filterdEvents: Event[];
    constructor(public nav: NavController, private _navParams: NavParams) {
        this._events = this._navParams.get('events');
        this.filterdEvents = this._events;
    }

    filterEvents(ev) {
        let val = ev.value.toLowerCase();
        if (val && val.trim() != '') {
            this.filterdEvents = this._events.filter((item) => {
                return (item.name.toLowerCase().indexOf(val) > -1);
            });
        }
        else{
          this.filterdEvents = this._events;
        }
    }

    openEvent(event:Event){
      this.nav.push(EventPage, {eventId:event.id});
    }
}
