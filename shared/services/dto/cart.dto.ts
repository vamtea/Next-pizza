import { pizzaSizes } from './../../constants/pizza';
import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};
export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValue {
  productItemId: number;
  ingredients?: number[];
}