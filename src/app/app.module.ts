import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductPageComponent } from './shop/product-page/product-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsComponent } from './maps/maps.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingMethodsComponent } from './checkout/shipping-methods/shipping-methods.component';
import { BillingDetailsComponent } from './checkout/billing-details/billing-details.component';
import { PaymentMethodsComponent } from './checkout/payment-methods/payment-methods.component';
import { environment } from 'src/environments/environment';
import { StoreService } from './shared/services/store.service';
import { MapsService } from './shared/services/maps.service';
import { ProductService } from './shared/services/product.service';
import { AvailabilityComponent } from './shop/product-page/availability/availability.component';
import { ShopComponent } from './shop/shop.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductPageComponent,
    ShoppingCartComponent,
    MapsComponent,
    CheckoutComponent,
    ShippingMethodsComponent,
    BillingDetailsComponent,
    PaymentMethodsComponent,
    AvailabilityComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [StoreService, MapsService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
