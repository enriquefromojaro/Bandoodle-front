import {PopOver, Action} from "../pop-over/pop-over";
import {Component, Input, EventEmitter, Output} from "@angular/core";
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
  @Input() options: Array<Action>=[];
  @Output("action") actionEmitter: EventEmitter<{value:string, cbResult?:any}>;

  constructor (private popoverCtrl:PopoverController){
      this.actionEmitter = new EventEmitter<{value:string, cbResult?:any}>();
  }

  showPopOver(myEvent:Event){
      var popover = this.popoverCtrl.create(PopOver, {options:this.options, actionEmitter:this.actionEmitter});
      popover.present({
        ev: myEvent,
      });
  }
};
