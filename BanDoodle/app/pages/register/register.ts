import {Musician} from "../../models/Musician";
import {Page, NavController} from 'ionic-angular';
import {MusicianService} from '../../services/musician-service';
import { ImagePicker } from 'ionic-native';
/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
    templateUrl: 'build/pages/register/register.html',
    providers: [MusicianService]
})
export class RegisterPage {
    user: Musician;
    constructor(public nav: NavController) {
        this.user = new Musician();
    }

    public select_avatar() {
        ImagePicker.getPictures({}).then(
            (results) => (this.user.avatar=results[0]),
            (err) => console.log('Imagen ERR: ', err)
        ).catch((err?) => console.error('Imagen ERROR: ', err));
    }
}
