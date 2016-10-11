import { BandService } from "../../services/band-service";
import { Filter } from "../../pipes/filter";
import { Musician } from "../../models/Musician";
import { Band } from "../../models/Band";
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { MusicianService } from "../../services/musician-service";
import { GlobalVarsService } from "../../services/global-vars-service";

@Component({
    selector: 'invite-users-modal',
    templateUrl: 'build/components/invite-users-modal/invite-users-modal.html',
    providers: [MusicianService, BandService],
    pipes: [Filter]
})
export class InviteUsersModal {

    band: Band;
    users: Musician[];
    invited_users: Musician[] = [];

    constructor(private viewCtrl: ViewController, private params: NavParams, private musicianService: MusicianService, private bandService: BandService) {
        this.band = params.get('band');
        var authtoken = params.get('authtoken');
        this.musicianService.setAuthToken(authtoken);
        this.bandService.setAuthToken(authtoken);
        this.musicianService.getAllMusicians().then(
            (users) => {
                var bandUsersIndexes = (<Musician[]>this.band.users).map(u => u.id);
                this.users = users.map(user => new Musician(user))
                    .filter(u => bandUsersIndexes.indexOf(u.id) < 0, this);
            }
        );

    }

    toogleInvitation(user: Musician) {
        var index = this.invited_users.indexOf(user);
        if (index >= 0) {
            console.log('Removing user from invitations');
            this.invited_users.splice(index, 1);
        }
        else {
            console.log('Adding user to invitations');
            this.invited_users.push(user);
        }
    }

    invite() {
        var data = {
            'invited_users': this.invited_users.map(u => u.id)
        };

        this.bandService.partialUpdateBand(this.band.id, data).then(
            (data)=>{
                alert('Usuarios invitados a la banda con éxito, espere su respuesta');
                this.viewCtrl.dismiss();
            },
            (err?)=>alert(err)
        )
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
