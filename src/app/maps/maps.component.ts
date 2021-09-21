import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '../shared/models/store.model';
import { MapsService } from '../shared/services/maps.service';
import { StoreService } from '../shared/services/store.service';
import { Location} from './../shared/models/location.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow ;
  @Input() mapHeight: number= 450;
  @Input() mapWidth: number= 450;

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: {lat: 51.44157584725519, lng: 7.565725496333208},
    zoom: 8
  };

  currentStore: Store;
  //storeLocations: {lat: number, lng: number}[];
  storeList = new Observable<Store[]>();

  currentLocation: google.maps.LatLngLiteral = { lat: 51.44157584725519, lng: 7.565725496333208};
  logo="../../assets/images/logos/location.png";
  icon = {
    url: "../../assets/images/logos/current-location.png", // url
};

  directionsResults$!: Observable<google.maps.DirectionsResult|undefined>;

  storeLocations: google.maps.LatLngLiteral[];

  constructor(
    private storeService: StoreService,
    private mapsService: MapsService,
    httpClient: HttpClient
    ){
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD06sIvfDMvAMu7HJf690MO4LrcxBuUvjI&libraries=places', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
      this.currentStore = this.storeService.currentStore;
      this.storeList = this.storeService.store;
      this.storeLocations = this.storeService.storeLocations;
      //console.log(this.storeLocations);

    }
  ngOnInit(): void {
  }
  currentUserLocation: google.maps.LatLngLiteral = { lat: 31.4914, lng: 74.2385};

  onGetCurrentLocation(){
    this.mapsService.getCurrentLocation()
    setTimeout(()=>{
      this.options = {
        center: this.mapsService.currentLocation
      };
      this.currentUserLocation = this.mapsService.currentLocation;
    },500)

  }
  onGetDirections(location: Location){
    this.mapsService.getDirections(location);
    this.directionsResults$ = this.mapsService.storeDirectionsResults$;
  }
  openInfoWindow(marker: MapMarker, store: Store, event: google.maps.MapMouseEvent) {
    this.currentStore = store;
    console.log(this.currentStore.name);
    this.infoWindow.open(marker);
    this.storeService.currentStoreLocation = event.latLng.toJSON();
    console.log(this.storeService.currentStoreLocation);
    this.storeService.currentStore = this.currentStore;
  }
  onSelectStore(){
    this.storeService.selectedStore = {
      location: this.storeService.currentStoreLocation,
      address: this.currentStore.address
    };
    alert( this.storeService.currentStore.name +' is now selected store'+ this.currentStore.address);
  }

}
