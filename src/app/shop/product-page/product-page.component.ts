import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { AvailabilityComponent } from './availability/availability.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  noOfItems = 1;

  sub: any;

  product!: Product;

  productImage!: string;
  colorSelected!: string;
  grandTotal: number = 0;

  apiKey = 'AIzaSyCKj-l5U2bLY3wEx-9DN1owQhs3a9iJ-Uw';
  preBtn!: Element;
  fee: number = 0;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private productService: ProductService
    ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const id = +params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
      setTimeout(()=>{
        this.product= this.productService.product;
      console.log(this.product);
      if(this.product){
        this.productImage = this.product.imageList[0];
        this.colorSelected =  this.product.availableColors[0];
      }
      },1000)

    });
  }

  onSizeSelect(size: number, index:number){
    this.product.size = size;
    const buttonList = document.getElementsByClassName('button');
    buttonList[index].classList.add("active");
    if(this.preBtn){
      this.preBtn.classList.remove("active");
    }
    this.preBtn = buttonList[index];
  }

  getProductDetail(id: number) {
    this.productService.getProductById(id);
  }


  onColorPick(event: MatRadioChange | MatButtonToggleChange){
    this.productImage = this.product.imageList[event.value];
    this.colorSelected =  this.product.availableColors[event.value];
  }

  openDialog() {
    this.dialog.open(AvailabilityComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  addToCart(){
    this.product.productImage = this.productImage;
    this.product.color = this.colorSelected;
    this.product.noOfItems = this.noOfItems;
    console.log(this.product);
    this.productService.addToCart(this.product);
  }
}
