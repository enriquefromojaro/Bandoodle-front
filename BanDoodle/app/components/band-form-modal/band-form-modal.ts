import {Band} from "../../models/Band";
import {Musician} from "../../models/Musician";
import {FileSelector} from "../file-selector/file-selector";
import {ViewController} from "ionic-angular/components/nav/view-controller";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Component} from '@angular/core';

/*
  Generated class for the BandFormModal component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'band-form-modal',
    templateUrl: 'build/components/band-form-modal/band-form-modal.html',
    directives: [FileSelector]
})
export class BandFormModal {
    user: Musician;
    band: Band;
    constructor(public params: NavParams, private viewCtrl: ViewController) {
        this.band = new Band();
        this.user = this.params.get('user');
        this.band.users = [this.user]
    }
    close() {
        this.viewCtrl.dismiss();
    }
}
