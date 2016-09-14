import {EventService} from "../../services/event-service";
import {GlobalVarsService} from "../../services/global-vars-service";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {NavController, Page, LoadingController} from 'ionic-angular';
import {VoteOptionsPage} from '../vote-options/vote-options';
import {GeneralPage} from '../general/general';
import {MapPage} from '../map/map';
import {Event} from '../../models/Event';
import {Subject} from 'rxjs/Subject';
import {Component} from '@angular/core';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';



@Component({
    templateUrl: 'build/pages/event-page/event-page.html',
    providers:[GlobalVarsService,EventService],
    directives: [NavBarMenuComponent]
})
export class EventPage {
    tab1Root: any;
    tab2Root: any;
    tab3Root: any;
    private _global_vars:GlobalVarsService;
    event:Event;
    params:{[key:string]:any}

    constructor(public nav: NavController, private _navParams:NavParams, public _event_service:EventService, private loadingCtrl:LoadingController) {
        // set the root pages for each tab
        this.tab1Root = VoteOptionsPage;
        this.tab2Root = GeneralPage;
        this.tab3Root = MapPage;

        this._global_vars = GlobalVarsService.getInstance();
        var id = this._navParams.get('eventId');
        let loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        this._event_service.setAuthToken(this._global_vars.getVar('authtoken'));
        loading.present()
        this.params = {
          event:new Subject<any>(),
          event_service:this._event_service
        }
        this._event_service.getEvent(id).then(
            (data) => {
                this.event = new Event(data.name, data.type, data.direction, data.time_options, data.id, data.description);
                loading.dismiss();
                this.params['event'].next(this.event);
                this.params['event']= this.event;
            }
        );
    }
}
