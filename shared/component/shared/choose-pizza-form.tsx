import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants, IngredientItem, PizzaImage } from ".";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { cn } from "@/shared/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Ingredient, ProductItem } from "@prisma/client";
import { useSet } from "react-use";
import {
  calcPizzaPrice,
  getAvailablePizzaSizes,
  getPizzaDetails,
} from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  price: number;
  loading?: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
  className,
  loading,
}) => {
  const {
    size,
    type,
    setSize,
    setType,
    availableSizes: availablePizzaSizes,
    selectedIngredients,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

 

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  }

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
            items={pizzaTypes}
          />
          <GroupVariants
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
            items={availablePizzaSizes}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
        loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
