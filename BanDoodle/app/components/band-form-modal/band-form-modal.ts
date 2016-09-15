import {Band} from "../../models/Band";
import {Musician} from "../../models/Musician";
import {FileSelector} from "../file-selector/file-selector";
import {ViewController} from "ionic-angular/components/nav/view-controller";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Component} from '@angular/core';
import {BandService} from "../../services/band-service";
import {GlobalVarsService} from "../../services/global-vars-service";

@Component({
    selector: 'band-form-modal',
    templateUrl: 'build/components/band-form-modal/band-form-modal.html',
    directives: [FileSelector],
    providers: [BandService, GlobalVarsService]
})
export class BandFormModal {
    user: Musician;
    band: Band;
    avatar:File;
    private globalVars;
    constructor(public params: NavParams, private viewCtrl: ViewController, private bandService: BandService) {
        this.band = new Band();
        this.user = this.params.get('user');
        this.band.users = [this.user];
        this.band.events = [];
        this.globalVars = GlobalVarsService.getInstance();
        this.globalVars.getVar('authtoken');
        this.bandService.setAuthToken(this.globalVars.getVar('authtoken'));
    }

    createBand(){
        var usersBackUp = this.band.users;
        if((<any>this.band.users).every(elem=>elem instanceof Musician))  {
            this.band.users = (<Musician[]> this.band.users).map((elem)=>elem.id);
        }
        this.bandService.createBand(this.band, this.avatar).then(
            (data)=>{
                alert('Group created successfully!!');
                this.user.bands.push(new Band(data));
                this.globalVars.setVar('user', this.user);
                this.close();
            },
            (err?) => { alert(err); this.band.users = usersBackUp;}
        )
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
