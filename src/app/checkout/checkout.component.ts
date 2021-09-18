import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../shared/models/order.model';
import { ProductService } from '../shared/services/product.service';
import { StoreService } from '../shared/services/store.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order!: Order;

  shippingMethod = new FormGroup({
    type: new FormControl('Self pickup'),
    start: new FormControl(''),
    end: new FormControl(''),
    time: new FormControl('')
  })


  firstFormGroup = new FormGroup({
    shippingMethod: this.shippingMethod
  });

  billing= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNo: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl('')
  })
  secondFormGroup = this._formBuilder.group({
    billing: this.billing
  });
  paymentMethod= new FormGroup({
    paymentOption: new FormControl('')
  })
  thirdFormGroup = this._formBuilder.group({
    paymentMethod: this.paymentMethod
  });
  stepperOrientation: Observable<StepperOrientation>;

  cartProducts: Product[]= [];
  orderPrice: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,

    private productService: ProductService,
    private storeService: StoreService
    ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit(): void {
    this.cartProducts = this.productService.getLocalCartProducts()
    this.orderPrice = this.productService.orderPrice;
  }

  onSubmit(){
    this.order = {
      orderId: 2020,
      billingDetails: {
        name: this.secondFormGroup.get('billing.name')?.value,
        email: this.secondFormGroup.get('billing.email')?.value,
        phoneNo: this.secondFormGroup.get('billing.phoneNo')?.value,
        address1: this.secondFormGroup.get('billing.address1')?.value,
        address2: this.secondFormGroup.get('billing.address2')?.value
      },
      productsOrdered: this.productService.getLocalCartProducts(),
      storeLocation: {
        id : 2020,
        address: this.storeService.selectedStore.address
      },
      pickupDate: {
        start: this.firstFormGroup.get('shippingMethod.start')?.value,
        end: this.firstFormGroup.get('shippingMethod.end')?.value
      },
      pickupTime: this.firstFormGroup.get('shippingMethod.time')?.value,
      pickupType: this.firstFormGroup.get('shippingMethod.type')?.value,
      paymentOption: this.thirdFormGroup.get('paymentMethod.paymentOption')?.value
    }
    console.log(this.order);
  }
}
