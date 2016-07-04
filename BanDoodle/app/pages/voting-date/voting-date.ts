import {Page} from 'ionic-angular';
import {NavBarMenuComponent} from '../../components/navBarMenu/navBarMenu';
import {DespDateVotingComponent} from '../../components/desplegable-date-voting/desplegable-date-voting';


@Page({
    templateUrl: 'build/pages/voting-date/voting-date.html',
    directives: [NavBarMenuComponent, DespDateVotingComponent],
})
export class VotingDatePage {
    debugMe(obj) {
    }
    days = [
        {
            day: 'Lunes',
            date: '23/03/2013',
            sessions: [
                {
                    start: '9.00',
                    end: '11.00',
                    avaiable: true,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '11.00',
                    end: '13.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData', 'Patata']
                },
                {
                    start: '13.00',
                    end: '14.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                }
            ]
        },
        {
            day: 'Marte',
            date: '21/04/2015',
            sessions: [
                {
                    start: '9.00',
                    end: '11.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '11.00',
                    end: '13.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '13.00',
                    end: '14.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                }
            ]
        },
        {
            day: 'Miercoles',
            date: '23/03/2017',
            sessions: [
                {
                    start: '9.00',
                    end: '11.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '11.00',
                    end: '13.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '13.00',
                    end: '14.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                }
            ]
        },
        {
            day: 'Domingo',
            date: '53/03/2028',
            sessions: [
                {
                    start: '9.00',
                    end: '11.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '11.00',
                    end: '13.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                },
                {
                    start: '13.00',
                    end: '14.00',
                    avaiable: false,
                    users: ['Usuario1', 'SVGAnimatedPathData']
                }
            ]
        }
    ];

    constructor() {

    }
}
