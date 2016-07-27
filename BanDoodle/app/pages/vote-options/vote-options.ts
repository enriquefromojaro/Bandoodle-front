import {TimeOption} from "../../models/TimeOptions";
import {EventService} from "../../services/event-service";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';
import {AtDatePipe} from '../../pipes/AtDate';
import {DespDateVotingComponent} from '../../components/desplegable-date-voting/desplegable-date-voting';


@Page({
    templateUrl: 'build/pages/vote-options/vote-options.html',
    pipes: [AtDatePipe],
    directives: [DespDateVotingComponent]
})
export class VoteOptionsPage {
    event: Event;
    dates: Date[];
    private _event_service: EventService;
    constructor(public nav: NavController, private _navParams: NavParams) {
        this.event = this._navParams.get('event');
        this.dates = []
        this._event_service = this._navParams.get('event_service');
        this.event.time_options = this.event.time_options.sort((a: TimeOption, b: TimeOption) => a.date.getTime() - b.date.getTime());
        var max_date = null;
        for (let ti_opt of this.event.time_options) {
            if (!max_date || ti_opt.date > max_date) {
                this.dates.push(ti_opt.date);
            }
            max_date = ti_opt.date;
        }
    }
}
