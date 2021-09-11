export interface Product{
  id?: number;
  name: string;
  category?: string[];
  subCategory: string[];
  price: number;
  discount?: number;
  noOfItems?: number;
  isAvailable?: boolean;
  inStock?: number; // rename to stock
  size: number;
  availableSizes: number[];
  color: string; //rename to defaultColor
  availableColors: string[];
  productImage?: string;
  imageList: string[];
  rating?: number;
  reviews?: number;
  description?: string;
}
