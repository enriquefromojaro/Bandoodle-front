"use strict";
var Musician = (function () {
    function Musician(data) {
        if (data.id)
            this._id = data.id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.email = data.email;
        this.bands = data.bands;
    }
    Object.defineProperty(Musician.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    return Musician;
}());
exports.Musician = Musician;
