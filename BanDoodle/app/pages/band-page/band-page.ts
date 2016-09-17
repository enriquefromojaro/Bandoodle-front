import {EventPage} from "../event-page/event-page";
import {UserListModal} from "../../components/user-list-modal/user-list-modal";
import {BandService} from "../../services/band-service";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Page, NavController, NavParams, LoadingController, ModalController} from "ionic-angular";
import {NavBarMenuComponent} from "../../components/navBarMenu/navBarMenu";
import {Action} from "../../components/pop-over/pop-over";
import {EventListPage} from "../event-list/event-list";
import {Component} from "@angular/core";

import {Band} from "../../models/Band";

@Component({
    templateUrl: "build/pages/band-page/band-page.html",
    providers: [GlobalVarsService, BandService],
    directives: [NavBarMenuComponent]

})
export class BandPage {
    private _global_vars: GlobalVarsService;

    private band:Band;
    options: Array<Action>;

    constructor(public nav: NavController, private navParams: NavParams, private _band_service: BandService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
        this._global_vars = GlobalVarsService.getInstance();
        this.band = this.navParams.get("band");
        this._band_service.setAuthToken(this._global_vars.getVar("authtoken"));

    }
    ngOnInit() {

        let loading = this.loadingCtrl.create({
            content: "Loading band info...",
        });
        loading.present();
        this._band_service.getband(this.band.id).then(
            (data) => {
                this.band = data;
                this.options = [
                    {
                        icon: "person-add",
                        text: "Nuevo miembro",
                        value: "add_member",
                        callBack: this.nav_to_event,
                        thisObj:this,
                        cbParams: [this.band.events[0]]

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

    log(ev){
        console.log(ev);
    }
}
