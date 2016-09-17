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
    directives: [NavBarMenuComponent]
})
export class EventListPage {
    private _events: Event[];
    private filterdEvents: Event[];
    options: Array<{icon:string, text:string, value:string, callBack?:Function}>;


    constructor(public nav: NavController, private _navParams: NavParams) {
        this._events = this._navParams.get('events');
        this.filterdEvents = this._events;
        this.options = [
            {
                icon: "person-add",
                text: "Nuevo miembro",
                value: "add_member"
            },
            {
                icon: "remove-circle",
                text: "Echar a miembro",
                value: "remove_member"
            },
            {
                icon: "create",
                text: "Modificar",
                value: "edit_band"
            },
            {
                icon: "calendar",
                text: "Añadir evento",
                value: "add_event"
            },
            {
                icon: "warning",
                text: "Salir del grupo",
                value: "exit_band"
            }
        ];
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
}
