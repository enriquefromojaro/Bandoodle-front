import {Band} from "../../models/Band";
import {BandService} from "../../services/band-service";
import {Page, NavController} from "ionic-angular";
import {GlobalVarsService} from "../../services/global-vars-service";
import {Component, forwardRef} from "@angular/core";
import {Musician} from "../../models/Musician";

@Component({
  templateUrl: "build/pages/welcome-page/welcome-page.html",
  providers: [GlobalVarsService, BandService],
  directives: [forwardRef(()=> NavBarMenuComponent)]
})
export class WelcomePage {
  private _gloval_vars: GlobalVarsService;
  user:Musician;
  invitations:{id:number|string, avatar:string, name:string, genre:string}[];
  constructor(public nav: NavController, private bandServ: BandService) {
    this._gloval_vars = GlobalVarsService.getInstance();
    this.user = this._gloval_vars.getVar("user");
    this.bandServ.setAuthToken(this._gloval_vars.getVar('authtoken'));
    this.bandServ.userInvitations().then(
        data =>this.invitations = data,
        err => alert(err)
    );
  }

  public acceptInv(band:{id:number|string}){
      this.bandServ.acceptInvitationv(band.id).then(
          data=>{
              var band = new Band(data);
              var user = this._gloval_vars.getVar('user');
              user.bands.push(band);
              this.invitations.splice(this.invitations.findIndex(b=>b.id ===band.id), 1);
              this._gloval_vars.setVar('user', user);
          },
          err=>alert(err)
      );
  }
}
import {NavBarMenuComponent} from "../../components/navBarMenu/navBarMenu";
