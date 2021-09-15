import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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

  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to Cart";

  cartProducts!: Product[];

  totalValue= 0;

  paymentPartner: {name:string, logo: string}[] = [{name:'MasterCard', logo: '../../assets/images/logos/mastercard-logo.png'}, {name:'Visa', logo: '../../assets/images/logos/Visa-logo.png'}, {name:'Paypal', logo: '../../assets/images/logos/paypal-logo.jpg'}];

  noOfItems: number[] = [];
  grandtotal = 0;

  constructor(private productService: ProductService) {

   }

  ngOnInit(): void {
    this.getCartProduct();
    for(let product of this.cartProducts){
      this.grandtotal += (product.price);
    }
  }
  onAddItem(index: number){
    if(this.cartProducts[index].noOfItems!>0){
      this.cartProducts[index].noOfItems!++;
      this.grandtotal=this.grandtotal+this.cartProducts[index].price;
    }
  }
  onRemoveItem(index: number){
    if(this.cartProducts[index].noOfItems!>1){
      this.cartProducts[index].noOfItems!--;
      this.grandtotal=this.grandtotal-this.cartProducts[index].price;
    }
  }

  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach((product) => {
      this.totalValue += product.price;
    });
    console.log(this.totalValue);
  }


}
