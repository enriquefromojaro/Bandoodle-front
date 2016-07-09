import {Alert} from "../../../node_modules/ionic-angular/components/alert/alert";
import {Page, NavController} from 'ionic-angular';
import {MusicianService} from '../../services/musician-service';
import {GlobalVarsService} from '../../services/global-vars-service';
import {WelcomePage} from '../welcome-page/welcome-page';
import {MyApp} from '../../app';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [MusicianService, GlobalVarsService]
})
export class LoginPage {
    username: string;
    password: string;
    remember: boolean;
    private global_vars;
    login() {
        var self = this;
        this.musician_service.login(this.username, this.password)
            .then(function(data) {
                self.global_vars.setVar('user', data.user);
                self.global_vars.addVar('authtoken', data.token);
                self.nav.setRoot(WelcomePage);
                if (self.remember) {
                    localStorage.setItem('user', data.user.id.toString());
                    localStorage.setItem('authtoken', data.token);
                }
            },
          (error?)=>{
            let alert = Alert.create({
                title: 'Error!!',
                subTitle: error.message || error,
                buttons: ['OK']
            });
            this.nav.present(alert);
          })
            .catch(err => {
                let alert = Alert.create({
                    title: 'Error!!',
                    subTitle: err.message || err,
                    buttons: ['OK']
                });
                this.nav.present(alert);
            });
    }
    constructor(public nav: NavController, private musician_service: MusicianService) {
        this.global_vars = GlobalVarsService.getInstance();
    }

}
