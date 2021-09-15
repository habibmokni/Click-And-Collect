import { Component, OnInit } from '@angular/core';
import { faLeaf, faBox, faMoneyCheck,faShoppingCart,faHeart, faSeedling, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { Store } from '../shared/models/store.model';
import { ProductService } from '../shared/services/product.service';
import { StoreService } from '../shared/services/store.service';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faLeaf = faLeaf;
  faBox = faBox;
  faMoney = faMoneyCheck;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faSeedling = faSeedling;
  faTrash = faTrash;

  cardMode: boolean= true;
  listMode: boolean = false;

  productList?: Product[];
  isLoading = true;

  store!: Store[];

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
      setTimeout(()=>{
      this.isLoading = false;
      this.store = this.storeService.store;
      console.log(this.store);
      this.productList =this.store[0].products
    },2000)
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
