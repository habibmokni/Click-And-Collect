import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../shared/models/product.model';
import { Store } from '../shared/models/store.model';
import { ProductService } from '../shared/services/product.service';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  productList: Product[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  paymentPartner: {name:string, logo: string}[] = [{name:'MasterCard', logo: '../../assets/images/logos/mastercard-logo.png'}, {name:'Visa', logo: '../../assets/images/logos/Visa-logo.png'}, {name:'Paypal', logo: '../../assets/images/logos/paypal-logo.jpg'}];

  noOfItems = 1;

  store: Store = {
    name: "MHMStore",
    address: "Thokar naiz baig",
    location: {
      lat: 31.4914,
      lng: 74.2385
    },
    description: 'This is a demo store it does not exist physically',
    openingTime: {
      open: '10am',
      close: '10pm'
    },
    isDefaultStore: true,
    products: []
  }

  constructor(private storeService: StoreService, private productService: ProductService) {
    this.productList = this.productService.productList;
   }

  ngOnInit(): void {

  }

}
