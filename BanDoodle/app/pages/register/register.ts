import {Page, NavController} from 'ionic-angular';
import {MusicianService} from '../../services/musician-service';
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
  constructor(public nav: NavController) {}
}
