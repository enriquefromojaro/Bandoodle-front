import {Page} from 'ionic-angular';
import{NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';


@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives:[NavBarMenuComponent],
})
export class Page3 {
  constructor() {

  }
}
