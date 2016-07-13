import {UserListModal} from "../../components/user-list-modal/user-list-modal";
import {Modal} from "ionic-angular/components/modal/modal";
import {Alert} from "ionic-angular/components/alert/alert";
import {BandService} from "../../services/band-service";
import {Loading} from "ionic-angular/components/loading/loading";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Page, NavController, NavParams} from 'ionic-angular';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';

/*
  Generated class for the BandPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
        let alert = Alert.create({
            title: 'Por implementar',
            subTitle: 'Este apartado no ha sido desarrollado todavía',
            buttons: ['OK']
        });
        this.nav.present(alert);
    }
    public nav_to_event(event: any) {
        let alert = Alert.create({
            title: 'Por implementar',
            subTitle: 'Este apartado no ha sido desarrollado todavía',
            buttons: ['OK']
        });
        this.nav.present(alert);
    }
}
