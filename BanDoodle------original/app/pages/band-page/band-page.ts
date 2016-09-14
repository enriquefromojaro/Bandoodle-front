import {EventPage} from "../event-page/event-page";
import {UserListModal} from "../../components/user-list-modal/user-list-modal";
import {BandService} from "../../services/band-service";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Page, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';
import {EventListPage} from '../event-list/event-list';
import {Component} from '@angular/core';

@Component({
    templateUrl: 'build/pages/band-page/band-page.html',
    providers: [GlobalVarsService, BandService],

})
export class BandPage {
    private _global_vars: GlobalVarsService;

    private band;

    constructor(public nav: NavController, private navParams: NavParams, private _band_service: BandService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
        this._global_vars = GlobalVarsService.getInstance();
        this.band = this.navParams.get('band');
        this._band_service.setAuthToken(this._global_vars.getVar('authtoken'));
    }
    ngOnInit() {
        let loading = this.loadingCtrl.create({
            content: "Loading band info...",
        });
        loading.present();
        this._band_service.getband(this.band.id).then(
            (data) => {
                this.band = data;
                loading.dismiss();
            }
        );
    }

    public show_users() {
        let modal = this.modalCtrl.create(UserListModal, { users: this.band.users });
        modal.present();
    }

    public show_events() {
        this.nav.push(EventListPage, { events: this.band.events });
    }
    public nav_to_event(event: any) {
        this.nav.push(EventPage, { eventId: event.id })
    }
}
