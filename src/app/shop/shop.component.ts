import { Component, OnInit } from '@angular/core';
import { faShoppingCart,faHeart } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;

  cardMode: boolean= true;
  listMode: boolean = false;

  productList = new Observable<Product[]>();
  isLoading = true;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.fetchProduct();
      this.isLoading = false;
      this.productList= this.productService.productList;
    //this.getAllProducts();
  }
  onListMode (){
    this.cardMode = false;
    this.listMode = true;
  }
  onCardMode(){
    this.cardMode = true;
    this.listMode = false;
  }
  /*getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.productList.push(y as Product);
        });
      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }
*/
  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
