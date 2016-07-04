import {Component, Input, OnInit} from '../../../node_modules/angular2/core';
@Component({
    templateUrl: 'build/components/desplegable-date-voting/desplegable-date-voting.html',
    selector: 'desp-vote-date'
})
export class DespDateVotingComponent implements OnInit{
    public static get OPENED_ICON(): string { return "ios-arrow-dropdown"; }
    public static get CLOSED_ICON(): string { return "ios-arrow-dropright"; }
    iconName: string;
    showSessions: boolean;
    @Input() selectedDay: any;
    constructor() {
        this.iconName = DespDateVotingComponent.CLOSED_ICON;
        this.showSessions = false;
    }

    ngOnInit(){
    }


    toogle(selectedDay) {
        if (this.iconName == DespDateVotingComponent.OPENED_ICON) {
            this.iconName = DespDateVotingComponent.CLOSED_ICON;
            this.showSessions = false;
        }
        else {
            this.iconName = DespDateVotingComponent.OPENED_ICON;
            this.showSessions = true;
        }
    }
}
