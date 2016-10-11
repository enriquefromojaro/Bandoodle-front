import { Page, NavController, LoadingController, AlertController } from 'ionic-angular';
import { MusicianService } from '../../services/musician-service';
import { GlobalVarsService } from '../../services/global-vars-service';
import { WelcomePage } from '../welcome-page/welcome-page';
import { RegisterPage } from '../register/register';
import { Component } from '@angular/core';


@Component({
    templateUrl: 'build/pages/login/login.html',
    providers: [MusicianService, GlobalVarsService],
})
export class LoginPage {
    username: string;
    password: string;
    remember: boolean;
    private global_vars;
    login() {
        var self = this;
        let loading = this.loadingCtrl.create({
            content: "Loging in...",
        });
        loading.present();
        this.musician_service.login(this.username, this.password)
            .then(function(data) {
                try {
                    self.global_vars.setVar('user', data.user);
                }
                catch (ReferenceError) {
                    self.global_vars.addVar('user', data.user);

                }

                self.global_vars.addVar('authtoken', data.token);
                self.nav.setRoot(WelcomePage);
                if (self.remember) {
                    localStorage.setItem('user', data.user.id.toString());
                    localStorage.setItem('authtoken', data.token);
                }
                loading.dismiss();
            },
            (error?) => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Error!!',
                    subTitle: error.message || error,
                    buttons: ['OK']
                });
                alert.present();
            })
            .catch(err => {
                loading.dismiss();
                let alert = self.alertCtrl.create({
                    title: 'Error!!',
                    subTitle: err.message || err,
                    buttons: ['OK']
                });
                alert.present();
            });
    }
    constructor(public nav: NavController, private musician_service: MusicianService,
        private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.global_vars = GlobalVarsService.getInstance();
    }

    register() {
        this.nav.push(RegisterPage);
    }

    rememberPass() {

        if (this.username && this.username.length > 0)
            this.musician_service.rememberPass(this.username).then(
                msg => alert(msg),
                err => alert(err)
            )
        else
            alert('Introduzca su nombre de usuario y vuelva a intentarlo');
    }
}
