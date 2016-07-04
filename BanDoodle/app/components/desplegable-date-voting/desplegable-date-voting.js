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
var core_1 = require('../../../node_modules/angular2/core');
var DespDateVotingComponent = (function () {
    function DespDateVotingComponent() {
        this.iconName = DespDateVotingComponent.CLOSED_ICON;
        this.showSessions = false;
        console.log('Day', this.selectedDay);
    }
    Object.defineProperty(DespDateVotingComponent, "OPENED_ICON", {
        get: function () { return "ios-arrow-dropdown"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DespDateVotingComponent, "CLOSED_ICON", {
        get: function () { return "ios-arrow-dropright"; },
        enumerable: true,
        configurable: true
    });
    DespDateVotingComponent.prototype.ngOnInit = function () {
        console.log('Day init ', this.selectedDay.sessions[0].users);
    };
    DespDateVotingComponent.prototype.toogle = function (selectedDay) {
        if (this.iconName == DespDateVotingComponent.OPENED_ICON) {
            this.iconName = DespDateVotingComponent.CLOSED_ICON;
            this.showSessions = false;
        }
        else {
            this.iconName = DespDateVotingComponent.OPENED_ICON;
            this.showSessions = true;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DespDateVotingComponent.prototype, "selectedDay", void 0);
    DespDateVotingComponent = __decorate([
        core_1.Component({
            templateUrl: 'build/components/desplegable-date-voting/desplegable-date-voting.html',
            selector: 'desp-vote-date'
        }), 
        __metadata('design:paramtypes', [])
    ], DespDateVotingComponent);
    return DespDateVotingComponent;
}());
exports.DespDateVotingComponent = DespDateVotingComponent;
