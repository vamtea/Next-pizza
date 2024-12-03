'use client'


import React from "react";
import { useCartStore } from "../store";
import { CreateCartItemValue } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValue) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState
};
