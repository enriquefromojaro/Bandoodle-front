import {EventPage} from "../event-page/event-page";
import {UserListModal} from "../../components/user-list-modal/user-list-modal";
import {Modal} from "ionic-angular/components/modal/modal";
import {Alert} from "ionic-angular/components/alert/alert";
import {BandService} from "../../services/band-service";
import {Loading} from "ionic-angular/components/loading/loading";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Page, NavController, NavParams} from 'ionic-angular';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';
import {EventListPage} from '../event-list/event-list';

@Page({
    templateUrl: 'build/pages/band-page/band-page.html',
    providers: [GlobalVarsService, BandService],
    directives: [NavBarMenuComponent]
})
export class BandPage {
    private _global_vars: GlobalVarsService;

    private band;

    constructor(public nav: NavController, private navParams: NavParams, private _band_service: BandService) {
        this._global_vars = GlobalVarsService.getInstance();
        this.band = this.navParams.get('band');
        this._band_service.setAuthToken(this._global_vars.getVar('authtoken'));
    }
    ngOnInit() {
        let loading = Loading.create({
            content: "Loading band info...",
        });
        this.nav.present(loading);
        this._band_service.getband(this.band.id).then(
            (data) => {
                this.band = data;
                loading.dismiss();
            }
        );
    }

    public show_users() {
        let modal = Modal.create(UserListModal, { users: this.band.users });
        this.nav.present(modal);
    }

    public show_events() {
        this.nav.push(EventListPage, {events:this.band.events});
    }
    public nav_to_event(event: any) {
        this.nav.push(EventPage,{eventId:event.id})
    }
}
