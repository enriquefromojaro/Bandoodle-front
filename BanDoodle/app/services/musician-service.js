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
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Musician_1 = require('../models/Musician');
require('rxjs/add/operator/toPromise');
var MusicianService = (function () {
    function MusicianService(http) {
        this.http = http;
        this.base_url = 'http://localhost:8000/musicians/';
    }
    MusicianService.prototype.getAllMusicians = function () {
        return this.http.get(this.base_url).toPromise().then(this.extractData).catch(this.handleError);
    };
    MusicianService.prototype.extractData = function (res) {
        var musicians = res.json();
        for (var _i = 0, musicians_1 = musicians; _i < musicians_1.length; _i++) {
            var val = musicians_1[_i];
            val = new Musician_1.Musician(val);
            console.log(val);
        }
        return musicians;
    };
    MusicianService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    MusicianService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MusicianService);
    return MusicianService;
}());
exports.MusicianService = MusicianService;
