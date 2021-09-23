import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../shared/models/order.model';
import { ProductService } from '../shared/services/product.service';
import { StoreService } from '../shared/services/store.service';
import { Product } from '../shared/models/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SnackbarService } from '../shared/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderSuccessComponent } from './order-success/order-success.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order!: Order;

  shippingMethod = new FormGroup({
    type: new FormControl('Self pickup'),
    dateControl: new FormControl('', [Validators.required]),
    shippingAddress: new FormControl('', [Validators.required])
  })


  firstFormGroup = new FormGroup({
    shippingMethod: this.shippingMethod
  });

  billing= new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required])
  })
  secondFormGroup = this._formBuilder.group({
    billing: this.billing
  });
  paymentMethod= new FormGroup({
    paymentOption: new FormControl('', [Validators.required])
  })
  thirdFormGroup = this._formBuilder.group({
    paymentMethod: this.paymentMethod
  });
  stepperOrientation: Observable<StepperOrientation>;

  storeAddress!: string;

  cartProducts: Product[]= [];
  orderPrice: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private db: AngularFirestore,
    private productService: ProductService,
    private storeService: StoreService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
    ) {
    this.storeService.selectedStore.subscribe(store=>{
      this.storeAddress = store.address;
      console.log(store.address);
    });
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit(): void {
    this.cartProducts = this.productService.getLocalCartProducts()
    this.orderPrice = this.productService.orderPrice;
  }

  onSubmit(){
    console.log(this.firstFormGroup);
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
        address: this.firstFormGroup.get('shippingMethod.shippingAddress')?.value
      },
      pickupDate: this.firstFormGroup.get('shippingMethod.dateControl')?.value,
      pickupType: this.firstFormGroup.get('shippingMethod.type')?.value,
      paymentOption: this.thirdFormGroup.get('paymentMethod.paymentOption')?.value
    }
    console.log(this.order);
  }
  onOrderConfirmation(){
    this.db.collection<Order>('orderList').add(this.order);
    this.snackbarService.success('Order placed Successfully');
    this.dialog.open(OrderSuccessComponent);
    this.productService.removeAllLocalCartProduct();
  }
}
