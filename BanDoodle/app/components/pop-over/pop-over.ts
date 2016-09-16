import { ViewController, NavParams, AlertController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import {GlobalVarsService} from "../../services/global-vars-service";


@Component({
    selector: "pop-over",
    templateUrl: "build/components/pop-over/pop-over.html"
})
export class PopOver {
    options: Array<{ icon: string, text: string, value: string, callBack?: Function }> = [];
    private globalVars:GlobalVarsService;
    constructor(private viewCtrl: ViewController, private navParams: NavParams, private alertCtrl: AlertController, private nav: NavController) {
        this.options = navParams.get("options");
        this.globalVars = GlobalVarsService.getInstance();
    }

    logout() {
        let confirmAlert = this.alertCtrl.create({
            title: "Logout",
            enableBackdropDismiss: false,
            message: "¿Estás seguro de que deseas cerrar sesión?",
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                    handler: () => {

                    }
                },
                {
                    text: "Cerrar sesión",
                    handler: () => {
                        localStorage.clear();
                        sessionStorage.clear();
                        this.globalVars.clear();
                        this.nav.setRoot(LoginPage);
                    }
                }
            ]
        });
        confirmAlert.fireOtherLifecycles = true;
        this.viewCtrl.onDidDismiss(()=>confirmAlert.present());
        this.viewCtrl.dismiss();
    }

    close() {
        this.viewCtrl.dismiss();
    }
}

import {LoginPage} from "../../pages/login/login";
