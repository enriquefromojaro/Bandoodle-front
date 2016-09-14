import {Actions} from "../actions/actions";
import {Component, Input} from '@angular/core';
import {App} from 'ionic-angular';

@Component({
  templateUrl:'build/components/navBarMenu/navBarMenu.html',
  selector:'nav-bar-menu',
  styleUrls:[
    'build/css/app.md.css'
  ],
  directives:[Actions]
})
export class NavBarMenuComponent{
  @Input() title:string;

  constructor (){

  }

  showPopOver(){

  }
};
