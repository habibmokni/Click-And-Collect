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
  //currentStoreLocation get it from store service
  constructor(private storeService: StoreService, private mapDirectionsService: MapDirectionsService){
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
          console.log(this.currentUserLocation);
        }
      )};
  }
}
