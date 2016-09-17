import {Page, NavController} from "ionic-angular";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Component, forwardRef} from "@angular/core";
import {Musician} from "../../models/Musician";

/*
  Generated class for the WelcomePagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: "build/pages/welcome-page/welcome-page.html",
  providers: [GlobalVarsService],
  directives: [forwardRef(()=> NavBarMenuComponent)]
})
export class WelcomePage {
  private _gloval_vars: GlobalVarsService;
  user:Musician;
  constructor(public nav: NavController) {
    this._gloval_vars = GlobalVarsService.getInstance();
    this.user = this._gloval_vars.getVar("user");
  }
}
import {NavBarMenuComponent} from "../../components/navBarMenu/navBarMenu";
