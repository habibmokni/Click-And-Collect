import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Product } from "../models/product.model";
import { StoreService } from "./store.service";
import { SnackbarService } from "./snackbar.service";
import { Observable } from "rxjs";
@Injectable()
export class ProductService{

  productList! : Observable<Product[]>;

  product!: Product;

  orderPrice: number = 0;

  constructor(private snackBarService: SnackbarService, private storeService: StoreService, private db: AngularFirestore){}


  addProductToDatabase(product: Product){
    this.db.collection('products').add(product);
  }
  fetchProduct(){
    this.productList = this.db.collection<Product>('products').valueChanges();
  }
  deleteProduct(key: string){
    //this.productList.remove(key);
  }
    // Adding new Product to cart db if logged in else localStorage
    addToCart(data: Product): void {
      const a: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
      a.push(data);

      this.snackBarService.info("Adding Product to Cart");
      setTimeout(() => {
        localStorage.setItem("avct_item", JSON.stringify(a));
      }, 500);
    }

    // Removing cart from local
    removeLocalCartProduct(product: Product) {
      const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!);
      this.snackBarService.warning("Removing product from cart");
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === product.id) {
          products.splice(i, 1);
          break;
        }
      }
      // ReAdding the products after remove
      localStorage.setItem("avct_item", JSON.stringify(products));
    }

    removeAllLocalCartProduct() {
      const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!);

      for (let i = 0; i < products.length; i++) {
        delete products[i];
      }

      // ReAdding the products after remove
      localStorage.removeItem("avct_item");
    }

    // Fetching Locat CartsProducts
    getLocalCartProducts(): Product[] {
      const products: Product[] =
        JSON.parse(window.localStorage.getItem("avct_item")!) || [];
        console.log('get cart items called' + products) ;

      return products;
    }

    getProductById(key: number) {
      this.productList.forEach(products=>{
        for(let product of products){
          if(product.id === key){
            this.product= product;
            console.log("found the product")
          }
        }
      })
      //this.product = this.storeService.store[0].products![key];
      //this.product = this.db.collection<Product>('products', ref => ref.where('id', '==', key)).valueChanges();

    }

}
