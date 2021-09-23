import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './shop/product-page/product-page.component';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'products', component: ShopComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products/:id', component: ProductPageComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
