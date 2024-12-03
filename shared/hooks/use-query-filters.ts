'use client'

import qs from "qs";

import { Filter } from "./use-filters";
import { useRouter } from "next/navigation";
import { useDeepCompareEffect } from "react-use";

export const useQueryFilters = (filters: Filter) => {
  const router = useRouter()

    useDeepCompareEffect(() => {
        const params = {
          ...filters.prices,
          pizzaTypes: Array.from(filters.pizzaTypes),
          sizes: Array.from(filters.sizes),
          ingredients: Array.from(filters.selectedIngredients),
        };
      
    
        const query = qs.stringify(params, {
          arrayFormat: "comma",
        });
    
        router.push(`?${query}`, {
          scroll: false,
        });
      }, [filters]);
}