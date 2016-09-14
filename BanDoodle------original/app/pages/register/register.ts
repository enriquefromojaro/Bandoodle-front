import {FileSelector} from "../../components/file-selector/file-selector";
import {Musician} from "../../models/Musician";
import {Page, NavController, ActionSheet} from 'ionic-angular';
import {MusicianService} from '../../services/musician-service';
import {Camera} from 'ionic-native';
import {Component} from '@angular/core';

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/register/register.html',
    providers: [MusicianService],
    directives: [FileSelector]
})
export class RegisterPage {
    user: Musician;
    avatar: File;
    password: string;
    constructor(public nav: NavController, private musician_service: MusicianService) {
        this.user = new Musician();
        this.avatar = new File([], 'patata.png');
    }


    submit() {
        this.musician_service.registerUser(this.user, this.avatar, this.password).subscribe(
            data => alert('DATA:' + data),
            (err?) => alert + ('ERROR:' + err)
        );
    }
}
