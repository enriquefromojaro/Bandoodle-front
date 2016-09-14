import {Musician} from "./models/Musician";
import {BandFormModal} from "./components/band-form-modal/band-form-modal";
import {BandPage} from "./pages/band-page/band-page";
import {Alert} from "ionic-angular/components/alert/alert";
import {App, Platform, MenuController, NavController, ionicBootstrap, Nav, ModalController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {MusicianService} from './services/musician-service';
import {GlobalVarsService} from './services/global-vars-service';
import {ViewChild, Component } from '@angular/core';
// import '../node_modules/zone.js';
// import 'reflect-metadata';

@Component({
    templateUrl: 'build/app.html',
    providers: [MusicianService, GlobalVarsService]
})
export class MyApp {
    rootPage: any = LoginPage;
    pages = [WelcomePage];
    app: App;
    platform: Platform;
    menu: MenuController;
    musician_service: MusicianService;
    global_vars_service: GlobalVarsService
    groups: any;
    user: Musician;
    @ViewChild(Nav) nav: Nav;

    static get parameters() {
        return [
            [App],
            [Platform],
            [MenuController],
            [MusicianService],
            [MusicianService],
        ];
    }
    constructor(app, platform, menu, musician_service, nav, private modalCtrl:ModalController ) {
        this.app = app;
        this.menu = menu;
        this.platform = platform;
        this.musician_service = musician_service;
        this.global_vars_service = GlobalVarsService.getInstance();
        var user = parseInt(localStorage.getItem('user'));
        var authtoken = localStorage.getItem('authtoken');

        if (user && authtoken) {
            var self = this;
            this.musician_service.setAuthToken(authtoken);
            this.musician_service.getMusician(user)
                .then(user => {
                    self.rootPage = WelcomePage;
                    self.global_vars_service.setVar('user', user);
                    self.global_vars_service.addVar('authtoken', authtoken);
                });
        }
        this.initializeApp();
    }

    initializeApp() {
        var self = this;
        this.platform.ready().then(() => {
            StatusBar.styleDefault();

            this.registerBackButtonListener();
        });
    }

    openPage(page: any, band?: any) {
        this.menu.close();
        this.nav.setRoot(page);
    }

    openBandPage(band: any) {
        this.menu.close();
        this.nav.setRoot(BandPage, { band: band });
    }
    ngOnInit() {

        this.global_vars_service.addVar('user', null);
        this.global_vars_service.getObservableVar('user').subscribe(value => {
            if (!value)
                this.groups = [];
            else {
                this.groups = value.bands;
                //this.user = value;
            }
        });
    }

    registerBackButtonListener() {
        this.platform.backButton.observers = [];
        this.platform.backButton.subscribe(() => {
            this.menu.close();

            if (this.nav.canGoBack()) {
                this.nav.pop();

                return;
            }

            let activePage = this.nav.getActive().instance;

            let rootPages = [WelcomePage, LoginPage, BandPage];

            // if current page is not in whitelistPage
            // then back to DashboardPage first
            if (rootPages.indexOf(activePage.constructor) < 0) {
                this.nav.setRoot(LoginPage);
            }
            else {
                this.platform.exitApp();
            }
        }, error => alert(error))
    }
    createBand() {
        this.menu.close();
        let createModal = this.modalCtrl.create(BandFormModal, { user: this.user });
        createModal.present();
    }
}

ionicBootstrap(MyApp);
