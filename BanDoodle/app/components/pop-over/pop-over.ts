import { ViewController, NavParams, AlertController, NavController } from "ionic-angular";
import { Component, EventEmitter } from "@angular/core";
import { GlobalVarsService } from "../../services/global-vars-service";

export interface Action { icon: string, text: string, value: string, callBack?: Function, thisObj?: any, cbParams?:any[]};

@Component({
    selector: "pop-over",
    templateUrl: "build/components/pop-over/pop-over.html"
})
export class PopOver {
    options: Array<Action> = [];
    private globalVars: GlobalVarsService;
    actionEmitter: EventEmitter<{ value: string, cbResult?: any }>;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private alertCtrl: AlertController, private nav: NavController) {
        this.options = navParams.get("options");
        this.actionEmitter = navParams.get("actionEmitter");
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
        this.viewCtrl.onDidDismiss(() => confirmAlert.present());
        this.viewCtrl.dismiss();
    }

    execAction(action: Action) {
        this.viewCtrl.onDidDismiss(() => {
            let result = undefined;
            if (action.callBack) {
                result = action.callBack.apply(action.thisObj, action.cbParams);
            }
            let emmitable;
            if (result !== undefined) {
                emmitable ={ value: action.value, cbResult: result };
            }
            else{
                emmitable ={ value: action.value };
            }

            this.actionEmitter.emit(emmitable);

        });
        this.viewCtrl.dismiss();
    }
    close() {
        this.viewCtrl.dismiss();
    }
}

import { LoginPage } from "../../pages/login/login";
