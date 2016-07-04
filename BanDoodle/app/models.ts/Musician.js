"use strict";
var Musician = (function () {
    function Musician(data) {
        this.id = data.id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.email = data.email;
        this.bands = data.bands;
    }
    Musician.prototype.getId = function () {
        return this.id;
    };
    Musician.prototype.setId = function (id) {
        this.id = id;
    };
    return Musician;
}());
exports.Musician = Musician;
