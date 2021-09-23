import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from 'src/app/shared/models/store.model';
import { MapsService } from 'src/app/shared/services/maps.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  @ViewChild('search') address!: ElementRef;
  mapHeight = 410;
  mapWidth = 700;
  private screenSize = screen.width;
  closestStore!: Store;
  nearByStores: {stores: Store, distances: number, stock: number}[] =[];
  productAvailabilty: string[] = [];
  stores: Store[] = [];

  constructor(
    private ngZone: NgZone,
    private mapService: MapsService,
    private storeService: StoreService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private productService: ProductService
    ) {
    this.storeService.store.subscribe(stores=>{
      console.log(stores);
      this.stores = stores;
      console.log(this.stores);
    });
  }

  ngOnInit(): void {
    if(this.screenSize <= 599){
      this.mapHeight= 350;
      this.mapWidth= 250;
    };
    const colorAndSizeSelected = this.productService.selectedColorAndSize;
    console.log(colorAndSizeSelected);
    setTimeout(()=>{
      const input= document.getElementById("search") as HTMLInputElement;

      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        this.nearByStores= [];
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

        this.checkProductAvailabilty(colorAndSizeSelected.color,colorAndSizeSelected.size);
        //yahan method run karein gy availability ka
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
    this.storeService.store.forEach(stores=>{
      for(let store of stores){
        if(store.location.lat === this.mapService.closestMarker.lat && store.location.lng === this.mapService.closestMarker.lng){
          this.closestStore = store;
        }
      }
    })

  }

  checkProductAvailabilty(color: string, productSize: number){
    let i=0;

      for(let store of this.stores){
        console.log(store);
          //yahan products ki for loop use karni h

          for(let variant of store.products[0].variants){

            if(variant.color === color){
              console.log
              for(let index=0; index<5; index++){

                if(variant.sizes[index] === productSize){
                  console.log(variant.sizes[index]);
                  this.nearByStores.push({
                    stores: store,
                    stock: variant.inStock[index],
                    distances: this.mapService.distanceInKm[i]
                  });
                  console.log(this.nearByStores);
               }
                  this.nearByStores.sort((a,b)=> a.distances-b.distances)
              }
            }

            }
            i++
          }

    }

    onStoreSelect(address: string, location: {lat: number, lng: number}){
      this.storeService.selectedStore.next({
        address: address,
        location: location
      });
      this.storeService.storeSelection = {
        address: address,
        location: location
      }
      this.snackbarService.success('Store selected as prefered');
      this.dialog.closeAll();
    }
}
