import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/shared/models/store.model';
import { MapsService } from 'src/app/shared/services/maps.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  @ViewChild('search') address!: ElementRef;
  mapHeight = 410;
  mapWidth = 350;
  private screenSize = screen.width;
  closestStore!: Store;

  constructor(private ngZone: NgZone, private mapService: MapsService, private storeService: StoreService) {}

  ngOnInit(): void {
    if(this.screenSize <= 599){
      this.mapHeight= 350;
      this.mapWidth= 250;
    };
    setTimeout(()=>{
      const input= document.getElementById("search") as HTMLInputElement;

      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        let zoom = 12;

        console.log(latitude + "longitude" + longitude);
        this.mapService.find_closest_marker(latitude, longitude);
        this.findClosestStore();
        console.log(this.closestStore);
      });
    });

    },3000);


    const options= {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"]
    };


  }

  findClosestStore(){
    for(let store of this.storeService.store){
      console.log(store.location);
      console.log(this.mapService.closestMarker);
      if(store.location.lat === this.mapService.closestMarker.lat && store.location.lng === this.mapService.closestMarker.lng){
        this.closestStore = store;
      }
    }
  }
}
