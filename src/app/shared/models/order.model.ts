import { Billing } from "./billing.model";
import { Product } from "./product.model";

export interface Order{
  orderId: number;
  billingDetails: Billing;
  productsOrdered: Product[];
  storeLocation: {
    id: number;
    address: string;
  }
  pickupType: string;
  pickupDate: {
    start: Date;
    end: Date
  };
  pickupTime: String;
  paymentOption: String;
}
