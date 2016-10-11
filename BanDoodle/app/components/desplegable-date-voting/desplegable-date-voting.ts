import {Musician} from "../../models/Musician";
import {GlobalVarsService} from "../../services/global-vars-service";
import {TimeOptionService} from "../../services/timeoption-service";
import {TimeOption} from "../../models/TimeOptions";
import {Component, Input, OnInit} from '@angular/core';

@Component({
    templateUrl: 'build/components/desplegable-date-voting/desplegable-date-voting.html',
    selector: 'desp-vote-date',
    providers: [TimeOptionService]
})
export class DespDateVotingComponent implements OnInit {
    public static get OPENED_ICON(): string { return "ios-arrow-dropdown"; }
    public static get CLOSED_ICON(): string { return "ios-arrow-dropright"; }
    iconName: string;
    showSessions: boolean;
    avaiable: boolean[];
    private _global_vars_service: GlobalVarsService;
    private user: any;
    @Input() date: Date;
    @Input() timeOptions: TimeOption[];
    constructor(private _time_option_service: TimeOptionService) {
        this._global_vars_service = GlobalVarsService.getInstance();
        this.iconName = DespDateVotingComponent.CLOSED_ICON;
        this.showSessions = false;
        this._time_option_service.setAuthToken(this._global_vars_service.getVar('authtoken'));
        this.user = this._global_vars_service.getVar('user');


    }

    ngOnInit() {
        var userId = this.user.id;
        this.avaiable = this.timeOptions.map((value) => value.voted_by.some(value => value.id === userId));
    }


    toogle() {
        if (this.iconName == DespDateVotingComponent.OPENED_ICON) {
            this.iconName = DespDateVotingComponent.CLOSED_ICON;
            this.showSessions = false;
        }
        else {
            this.iconName = DespDateVotingComponent.OPENED_ICON;
            this.showSessions = true;
        }
    }

    toogleTimeOption(timeOption: TimeOption, index: number) {
        let self = this;
        this._time_option_service.toogleVote(timeOption.id).then(
            data => {
                timeOption.voted_by = []
                for (let u of data.voted_by) {
                    timeOption.voted_by.push(new Musician(u));
                }
            },
            (reasson?) => {
                this.avaiable[index] = !this.avaiable[index];
                alert('Denegado:'+ reasson);
            }

        );
    }
}
