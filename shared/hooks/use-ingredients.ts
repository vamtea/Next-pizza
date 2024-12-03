
import { Ingredient } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    }
    fetchIngredients();

    // Api.ingredients
    //   .getAll()
    //   .then((data) => setItems(data))
    //   .catch((error) => console.log(error));
  }, []);
  return {
    ingredients,
    loading,
  };
}