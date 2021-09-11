import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Store } from "../models/store.model";
import { map } from "rxjs/operators"


@Injectable()
export class StoreService{

  currentStoreLocation: {lat: number, lng: number} = {lat: 0, lng: 0};
  currentStore: Store;

  selectedStoreLocation: {lat: number, lng: number} = {lat: 0, lng: 0};
  storeLocations: {lat: number, lng: number}[] = [];

  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 32.12213446045631, lng: 72.69902402104954},
    { lat: 32.12051706178957, lng: 72.69989305671359},
    { lat: 32.11959022491546, lng: 72.69905620755563}
  ];


  private storeCollection!: AngularFirestoreCollection<Store>;
  store!: Store[];


  storeList: Store[] = [
    {
    id: "2020",
    name: 'Store 1',
    address: 'Phase 1, Sargodha',
    location: {
      lat: 32.12213446045631,
      lng: 72.69902402104954
    },
    openingTime: {
      open: "10am",
      close: "10pm"
    },
    isDefaultStore: false
  },
  {
    id: '2021',
    name: 'Store 2',
    address: 'Phase 2, Sargodha',
    location: {
      lat: 32.12051706178957,
      lng: 72.69989305671359
    },
    openingTime: {
      open: "10am",
      close: "10pm"
    },
    isDefaultStore: false
  },
  {
    id: '2022',
    name: 'Store 3',
    address: 'Phase 3, Sargodha',
    location: {
      lat: 32.11959022491546,
      lng: 72.69905620755563
    },
    openingTime: {
      open: "10am",
      close: "10pm"
    },
    isDefaultStore: false
  }
]

  constructor(private db: AngularFirestore){
    this.storeCollection = db.collection('storeList');
    this.fetchStore();
    this.getStoreLocations();
    this.currentStore =
      {
        id: "2020",
        name: 'Store 1',
        address: 'Phase 1, Sargodha',
        location: {
          lat: 32.12213446045631,
          lng: 72.69902402104954
        },
        products: [
          {
            id: 3232,
            name: 'Nike Pink Shoe',
            color: '#590F34',
            subCategory: ['Unisex','blue shoes'],
            price: 799,
            inStock: 10,
            size: 41,
            productImage: '../../assets/images/mehron.png',
            imageList: [
              '../../assets/images/blue.png',
              '../../assets/images/mehron.png',
              '../../assets/images/black.png',
              '../../assets/images/white.png'
            ],
            availableColors: ['#ADDDDA', '#590F34', '#8C949C', '#C9BDAB'],
            availableSizes: [41, 42, 43, 44, 45]
          },
          {
            id: 2244,
            name: 'Nike blue Shoe',
            color: '#ADDDDA',
            subCategory: ['Unisex','blue shoes'],
            price: 799,
            inStock: 10,
            size: 41,
            productImage: '../../assets/images/blue.png',
            imageList: [
              '../../assets/images/blue.png',
              '../../assets/images/mehron.png',
              '../../assets/images/black.png',
              '../../assets/images/white.png'
            ],
            availableColors: ['#ADDDDA', '#590F34', '#8C949C', '#C9BDAB'],
            availableSizes: [41, 42, 43, 44, 45]
          }
        ],
        //add products here after namaz
        openingTime: {
          open: "10am",
          close: "10pm"
        },
        isDefaultStore: false
      }
      //this.addStoreToDatabase(this.currentStore);
  }

  fetchStore(){
    this.storeCollection
    .snapshotChanges()
    .pipe(map(docArray =>{
      return docArray.map(doc => {
        return {
          //id: doc.payload.doc.id,
          ...doc.payload.doc.data() as Store
        }
      })
    }))
    .subscribe((store)=>{
      this.store = store;
    })
  }
  getStore(){
    return this.store;
  }
  getStoreLocations(){
    this.db.collection<{lat: number, lng:number}>('storeLocations')
    .snapshotChanges()
    .pipe(map(action => {
      return action.map(location =>{
        return {
          ...location.payload.doc.data()
        }
      })
    }))
    .subscribe(locations=>{
      for(let location of locations){
        this.storeLocations.push(location);
      }
    })
  }
  addStoreToDatabase(store: Store){
    this.db.collection('storeList').add(store);
    console.log("Store created in db");
  }
  addStoreLocations(location: {lat: string, lng: string}){
   this.db.collection('storeLocations').add(location);
  }
}
