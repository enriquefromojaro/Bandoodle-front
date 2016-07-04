import {App, Platform, IonicApp, MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {MusicianService} from './services/musician-service';
import {GlobalVarsService} from './services/global-vars-service';


@App({
    templateUrl: 'build/app.html',
    config: {},
    providers: [MusicianService, GlobalVarsService]
})
export class MyApp {
    rootPage: any = LoginPage;
    pages = [TabsPage, WelcomePage];
    app: IonicApp;
    platform: Platform;
    menu: MenuController;
    musician_service: MusicianService;
    global_vars_service: GlobalVarsService
    groups: any;

    static get parameters() {
        return [
            [IonicApp],
            [Platform],
            [MenuController],
            [MusicianService]
        ];
    }
    constructor(app, platform, menu, musician_service) {
        this.app = app;
        this.menu = menu;
        this.platform = platform;
        this.musician_service = musician_service;
        this.global_vars_service = GlobalVarsService.getInstance();
    }

    ininitializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page: any) {
        this.menu.close();
        let nav = this.app.getComponent('nav');
        nav.setRoot(page);
    }
    ngOnInit() {
        var user = localStorage.getItem('user');
        var pass = localStorage.getItem('password');
        if (user && pass) {
            var self = this;
            this.musician_service.login(user, pass).then(
                user => {
                    self.global_vars_service.setVar('user', user);
                    self.rootPage = WelcomePage;
                },
                (reasson?) => {
                    if (reasson) {
                        alert(reasson);
                    }
                }
            );
        }
        this.global_vars_service.addVar('user',null);
        this.global_vars_service.getObservableVar('user').subscribe(value => {
            if (!value)
                this.groups = [];
            else {
              this.groups = value.bands;
            }
        });
    }
}
