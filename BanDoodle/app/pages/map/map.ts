import {Observable} from "rxjs/Observable";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';

@Page({
    templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
    event: Event;
    constructor(public nav: NavController, private _navParams: NavParams) {
        this.event = this._navParams.get('event');
    }
}
