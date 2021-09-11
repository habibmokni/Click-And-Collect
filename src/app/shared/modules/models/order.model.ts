import { Billing } from "./billing.model";

export interface Order{
  orderId: string;
  orderDetails: Billing[];
}
