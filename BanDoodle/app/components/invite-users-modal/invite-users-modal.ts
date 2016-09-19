import {Band} from "../../models/Band";
import {Musician} from "../../models/Musician";
import { Component } from '@angular/core';
import {MusicianService} from "../../services/musician-service";
import {GlobalVarsService} from "../../services/global-vars-service";
import {ViewController, NavParams, } from "ionic-angular";

/*
  Generated class for the InviteUsersModal component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'invite-users-modal',
  templateUrl: 'build/components/invite-users-modal/invite-users-modal.html',
  providers: [GlobalVarsService, MusicianService]
})
export class InviteUsersModal {

  users: Musician[];
  band:Band;
  globalVars: GlobalVarsService;

  constructor(private viewCtrl:ViewController, private params:NavParams, private musicianService:MusicianService) {
      this.globalVars = GlobalVarsService.getInstance();
      this.band = params.get('band');
      this.musicianService.setAuthToken(this.globalVars.getVar('authtoken'));
      this.musicianService.getAllMusicians().then(
          (users)=>{
              //this.users = users.filter((user)=> )
          }
      )
  }
}
