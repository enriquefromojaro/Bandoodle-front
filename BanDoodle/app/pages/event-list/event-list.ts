import {GlobalVarsService} from "../../services/global-vars-service";
import {EventService} from "../../services/event-service";
import {EventPage} from "../event-page/event-page";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';
import {Component} from '@angular/core';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';

/*
  Generated class for the EventListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/event-list/event-list.html',
    directives: [NavBarMenuComponent],
    providers: [EventService, GlobalVarsService]
})
export class EventListPage {
    private _events: Event[];
    private filterdEvents: Event[]; //<--------------modifiar a pipe
    private globalVars: GlobalVarsService


    constructor(public nav: NavController, private _navParams: NavParams, private eventServ:EventService) {
        this._events = this._navParams.get('events');
        this.filterdEvents = this._events;

        this.globalVars = GlobalVarsService.getInstance();
        this.eventServ.setAuthToken(this.globalVars.getVar('authtoken'));
    }

    filterEvents(ev) {
        let val = ev.target.value.toLowerCase();
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

    removeEvent(event:Event){
        this.eventServ.deleteEvent(event).then(
            data=>this._events.splice(this._events.findIndex(ev=> ev.id === event.id),1),
            err=>alert(err)
        );
    }
}
