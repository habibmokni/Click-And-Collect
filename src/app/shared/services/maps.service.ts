import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StoreService } from "./store.service";
import { Location } from "./../models/location.model";
import { MapDirectionsService } from "@angular/google-maps";
import { map } from "rxjs/operators";

@Injectable()
export class MapsService{
  storeDirectionsResults$!: Observable<google.maps.DirectionsResult|undefined>;
  currentUserLocation!: Location;

  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 32.12213446045631, lng: 72.69902402104954},
    { lat: 32.12051706178957, lng: 72.69989305671359},
    { lat: 32.11959022491546, lng: 72.69905620755563}
  ];

  //currentStoreLocation get it from store service
  constructor(private storeService: StoreService, private mapDirectionsService: MapDirectionsService){
    this.markerPositions.push(...this.storeService.storeLocations);
    for(let marker of this.markerPositions){
      console.log("markers lat"+ marker.lat + 'lng' + marker.lng);
    }
  }

  getDirections(location: Location){
    const request: google.maps.DirectionsRequest = {
      destination: {lat: location.lat, lng: location.lng},
      origin: {lat: 32.121404, lng: 72.6970843},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.storeDirectionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.currentUserLocation = pos;
          this.find_closest_marker(pos.lat, pos.lng);
        }
      )};
  }
  rad(x: number) {
    return x*Math.PI/180;
  }
  find_closest_marker(lat: number, lng:number) {
    //var lat = event.latLng.lat();
    //var lng = event.latLng.lng();
    var lat = lat;
    var lng = lng;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for(let i=0;i<this.markerPositions.length; i++ ) {
        var mlat = this.markerPositions[i].lat;
        var mlng = this.markerPositions[i].lng;
        var dLat  = this.rad(mlat - lat);
        var dLong = this.rad(mlng - lng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.rad(lat)) * Math.cos(this.rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }

    console.log(this.markerPositions[closest]);
}
}
