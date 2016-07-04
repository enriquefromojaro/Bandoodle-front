import {Component, Input} from '../../../node_modules/angular2/core';
@Component({
  templateUrl:'build/components/navBarMenu/navBarMenu.html',
  selector:'nav-bar-menu',
  styleUrls:[
    'build/css/app.md.css'
  ]
})
export class NavBarMenuComponent{
  @Input() title:string;
}
