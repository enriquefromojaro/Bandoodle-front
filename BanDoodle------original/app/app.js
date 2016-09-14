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
var ionic_native_1 = require('ionic-native');
var tabs_1 = require('./pages/tabs/tabs');
var login_1 = require('./pages/login/login');
var musician_service_1 = require('./services/musician-service');
var MyApp = (function () {
    function MyApp(app, platform, menu, musician_service) {
        this.musician_service = musician_service;
        this.rootPage = tabs_1.TabsPage;
        this.pages = [tabs_1.TabsPage, login_1.LoginPage];
        this.app = app;
        this.menu = menu;
        this.platform = platform;
    }
    Object.defineProperty(MyApp, "parameters", {
        get: function () {
            return [
                [ionic_angular_1.IonicApp],
                [ionic_angular_1.Platform],
                [ionic_angular_1.MenuController],
            ];
        },
        enumerable: true,
        configurable: true
    });
    MyApp.prototype.ininitializeApp = function () {
        this.platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
        });
        console.log('llalalalalalaal');
    };
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        var nav = this.app.getComponent('nav');
        nav.setRoot(page);
    };
    MyApp = __decorate([
        ionic_angular_1.App({
            templateUrl: 'build/app.html',
            config: {},
            providers: [musician_service_1.MusicianService]
        }), 
        __metadata('design:paramtypes', [Object, Object, Object, musician_service_1.MusicianService])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
