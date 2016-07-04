"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var navBarMenu_1 = require('../../components/navBarMenu/navBarMenu');
var desplegable_date_voting_1 = require('../../components/desplegable-date-voting/desplegable-date-voting');
var VotingDatePage = (function () {
    function VotingDatePage() {
        this.days = [
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
    }
    VotingDatePage.prototype.debugMe = function (obj) {
        console.log(obj);
        console.log(this.days);
    };
    VotingDatePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/voting-date/voting-date.html',
            directives: [navBarMenu_1.NavBarMenuComponent, desplegable_date_voting_1.DespDateVotingComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], VotingDatePage);
    return VotingDatePage;
}());
exports.VotingDatePage = VotingDatePage;
