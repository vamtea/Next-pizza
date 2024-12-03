import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValue } from "../services/dto/cart.dto";
import toast from "react-hot-toast";

export interface CartState {
  loading: boolean;
  items: CartStateItem[];
  error: boolean;
  totalAmount: number;

  //  получение товаров из корзины
  fetchCartItems: () => Promise<void>;

  //   запрос на обновление количества товара
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  //   добавление товара в корзину
  addCartItem: (values: any) => Promise<void>;

  //   запрос на удаление товара из корзины
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.updateItemQuantity(id, quantity);

      set(getCartDetails(data));
      toast.success("теперь больше пицц в корзине");
    } catch (error) {
      toast.error("не удалось добавить больше пиццу в корзину");
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValue) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
