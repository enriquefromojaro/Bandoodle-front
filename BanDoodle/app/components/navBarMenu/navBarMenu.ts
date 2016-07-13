import {Component, Input} from '@angular/core';
@Component({
  templateUrl:'build/components/navBarMenu/navBarMenu.html',
  selector:'nav-bar-menu',
  styleUrls:[
    'build/css/app.md.css'
  ]
})
export class NavBarMenuComponent{
  @Input() title:string;
};
