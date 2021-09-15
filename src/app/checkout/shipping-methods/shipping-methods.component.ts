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

  mapHeight = 410;
  mapWidth = 350;
  private screenSize = screen.width;

  constructor() { }

  ngOnInit(): void {
    if(this.screenSize <= 599){
      this.mapHeight= 410;
      this.mapWidth= 350;
    }
  }

  onTypeSelect(){
  }
}
