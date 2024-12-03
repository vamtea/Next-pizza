import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Skeleton } from "../../ui";

interface Props {
  loading?: boolean;
  className?: string;
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-7">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                quantity={item.quantity}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                disabled={item.disabled}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
