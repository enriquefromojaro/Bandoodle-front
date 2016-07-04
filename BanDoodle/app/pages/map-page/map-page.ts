import {Page} from 'ionic-angular';
import{NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';

@Page({
  templateUrl: 'build/pages/map-page/map-page.html',
  directives:[NavBarMenuComponent],
})
export class MapPage {
  map: any;
  constructor() {
    this.map = null;


  }
}
