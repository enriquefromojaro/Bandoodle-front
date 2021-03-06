import {Observable} from "rxjs/Observable";
import {NavParams} from "ionic-angular/components/nav/nav-params";
import {Page, NavController} from 'ionic-angular';
import {Event} from '../../models/Event';
import {Component} from '@angular/core';


@Component({
    templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
    event: Event;
    map: any;
    lat: number = 51.678418;
    lng: number = 7.809007;
    constructor(public nav: NavController, private _navParams: NavParams) {
        this.event = this._navParams.get('event');

    }
    ngOnInit() {
        this.initMap();
    }

    initMap() {
        let mapEle = document.getElementById('map_canvas');
        var geoCoder = new google.maps.Geocoder();
        var center: any;
        let map;
        var event = this.event;
        geoCoder.geocode({ address: this.event.address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                center = results[0].geometry.location;
                map = new google.maps.Map(mapEle, {
                    center: center,
                    zoom: 20,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker({
                    map: map,
                    position: center
                });

                let content = `<h4>${event.name} : ${event.address}</h4>`;

                let infoWindow = new google.maps.InfoWindow({
                  content:content
                });
                google.maps.event.addListener(marker, 'click', ()=>infoWindow.open(map, marker));
            } else {
                center = new google.maps.LatLng(50, 50);
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}
