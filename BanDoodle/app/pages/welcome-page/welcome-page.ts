import {Page, NavController} from 'ionic-angular';
import {GlobalVarsService} from '../../services/global-vars-service';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';

/*
  Generated class for the WelcomePagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/welcome-page/welcome-page.html',
  providers: [GlobalVarsService],
  directives: [NavBarMenuComponent]
})
export class WelcomePage {
  private _gloval_vars: GlobalVarsService;
  constructor(public nav: NavController) {
    this._gloval_vars = GlobalVarsService.getInstance();
  }
}
