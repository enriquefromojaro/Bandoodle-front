import {PopOver} from "../pop-over/pop-over";
import {Component, Input} from "@angular/core";
import {App, PopoverController, AlertController, NavController} from "ionic-angular";


@Component({
  templateUrl:'build/components/navBarMenu/navBarMenu.html',
  selector:'navbar-menu',
  styleUrls:[
    'build/css/app.md.css'
  ]
})
export class NavBarMenuComponent{
  @Input() title:string;
  @Input()menuMode:boolean=false;
  @Input() options: Array<{icon:string, text:string, value:string, callBack?:Function}>=[];

  constructor (private popoverCtrl:PopoverController){
  }

  showPopOver(myEvent:Event){
      let popover = this.popoverCtrl.create(PopOver, {options:this.options});
      popover.present({
        ev: myEvent,
      });
  }
};
