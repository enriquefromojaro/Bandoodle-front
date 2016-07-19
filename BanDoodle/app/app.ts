import {Nav} from "../node_modules/ionic-angular/components/nav/nav";
import {BandPage} from "./pages/band-page/band-page";
import {Alert} from "../node_modules/ionic-angular/components/alert/alert";
import {App, Platform, MenuController, NavController, IonicApp} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {MusicianService} from './services/musician-service';
import {GlobalVarsService} from './services/global-vars-service';
import {ViewChild } from '@angular/core';


@App({
    templateUrl: 'build/app.html',
    config: {},
    providers: [MusicianService, GlobalVarsService]
})
export class MyApp {
    rootPage: any = LoginPage;
    pages = [WelcomePage];
    app: IonicApp;
    platform: Platform;
    menu: MenuController;
    musician_service: MusicianService;
    global_vars_service: GlobalVarsService
    groups: any;
    @ViewChild(Nav) nav: Nav;

    static get parameters() {
        return [
            [IonicApp],
            [Platform],
            [MenuController],
            [MusicianService],
        ];
    }
    constructor(app, platform, menu, musician_service, nav) {
        this.app = app;
        this.menu = menu;
        this.platform = platform;
        this.musician_service = musician_service;
        this.global_vars_service = GlobalVarsService.getInstance();
    }

    ininitializeApp() {
      var self = this;
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
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
        this.global_vars_service.addVar('user', null);
        this.global_vars_service.getObservableVar('user').subscribe(value => {
            if (!value)
                this.groups = [];
            else {
                this.groups = value.bands;
            }
        });
    }
}
