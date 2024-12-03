import { Ingredient, ProductItem } from "@prisma/client";
import { calcPizzaPrice } from "./calc-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcPizzaPrice(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
      );
    
      const textDetaills = ` ${size} см, ${mapPizzaType[type]} тесто, (${selectedIngredients.size} ингредиентов)`;
    
      return {totalPrice, textDetaills}
};