import {Page} from 'ionic-angular';
import {VotingDatePage} from '../voting-date/voting-date';
import {MapPage} from '../map-page/map-page';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabsRoot :any[]=[VotingDatePage, MapPage, Page3]
  getPageName(page:any){
    return page.name;
  }
}
