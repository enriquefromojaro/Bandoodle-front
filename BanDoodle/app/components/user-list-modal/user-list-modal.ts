import {NavParams} from "ionic-angular/components/nav/nav-params";
import {ViewController} from "ionic-angular/components/nav/view-controller";
import {Musician} from "../../models/Musician";
import {Component, Input} from '@angular/core';

@Component({
    selector: 'user-list-modal',
    templateUrl: 'build/components/user-list-modal/user-list-modal.html'
})
export class UserListModal {
    users: Musician[];
    constructor(public params: NavParams, private viewCtrl: ViewController) {
        this.users = this.params.get('users');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
