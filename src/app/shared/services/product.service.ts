import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Product } from "../models/product.model";
import { ToastrService } from "./toastr.service";
import { StoreService } from "./store.service";
@Injectable()
export class ProductService{

  product!: Product;

  productList: Product[] = [{name: 'Nike Pink Shoe', color: '#590F34', subCategory: ['Unisex','blue shoes'], price: 799, noOfItems: 1, size: 41, productImage: '../../assets/images/mehron.png', imageList: [], availableColors: [], availableSizes: []},
                                    {name: 'Nike Blue Shoe', color: '#cde9e6', subCategory: ['Unisex','blue shoes'], price: 799, noOfItems: 1, size: 41, productImage: '../../assets/images/blue.png',imageList: [], availableColors: [], availableSizes: []}]


  constructor(private toastrService: ToastrService, private storeService: StoreService){}


  deleteProduct(key: string){

  }
    // Adding new Product to cart db if logged in else localStorage
    addToCart(data: Product): void {
      const a: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
      a.push(data);

      this.toastrService.info("Adding Product to Cart","Product Adding to the cart");
      setTimeout(() => {
        localStorage.setItem("avct_item", JSON.stringify(a));
      }, 500);
    }

    // Removing cart from local
    removeLocalCartProduct(product: Product) {
      const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!);

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
        JSON.parse(localStorage.getItem("avct_item")!) || [];

      return products;
    }

    getProductById(key: number) {
      this.product = this.storeService.store[0].products![key];
      console.log(this.product);
      return this.product;
    }

}
