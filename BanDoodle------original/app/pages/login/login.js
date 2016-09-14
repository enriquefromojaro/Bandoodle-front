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
var musician_service_1 = require('../../services/musician-service');
var LoginPage = (function () {
    function LoginPage(nav, musician_service) {
        this.nav = nav;
        this.musician_service = musician_service;
    }
    LoginPage.prototype.login = function () {
        alert(this.username + '  ' + this.password);
        console.log(this.musician_service.getAllMusicians());
    };
    LoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/login/login.html',
            providers: [musician_service_1.MusicianService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, musician_service_1.MusicianService])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
