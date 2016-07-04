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
    patata: any;
    remember: boolean;
    private global_vars;
    login() {
      var self = this;
        this.musician_service.login(this.username, this.password)
            .then(function(user) {
                self.global_vars.setVar('user', user);
                self.nav.setRoot(WelcomePage);
                if (self.remember) {
                    localStorage.setItem('user', user.username);
                    localStorage.setItem('password', self.password);
                }
            })
            .catch(err => alert(err.message || err));
    }
    constructor(public nav: NavController, private musician_service: MusicianService) {
      this.global_vars = GlobalVarsService.getInstance();
    }

}
