import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.css']
})
export class ShippingMethodsComponent implements OnInit {

  type= new FormControl;
  @Input() shippingMethod!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onTypeSelect(){
  }
}
