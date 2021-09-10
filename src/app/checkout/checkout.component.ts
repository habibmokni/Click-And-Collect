import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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



  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
  }

}
