'use client'

import React from 'react';
import toast from 'react-hot-toast';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;

}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: onSubmit,  }) => {
    const loading = useCartStore((state) => state.loading)
    const addCartItem = useCartStore((state) => state.addCartItem)

    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onClickSubmit = async (productItemId?: number, ingredients?: number[]) => {
      try {
        const itemId = productItemId ?? firstItem.id
        await addCartItem({
          productItemId: itemId,
          ingredients,
        })
        toast.success('теперь больше пицц в корзине')
        onSubmit?.()


      } catch (error) {
        toast.error('не удалось добавить пиццу в корзину')
        console.error(error)
      }
    }

    if(isPizzaForm) {
      return (
        <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredient}
        items={product.items}
        onSubmit={onClickSubmit}
        loading={loading}
        price={firstItem.price}
        />
      )
    }
    return (
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          onSubmit={onSubmit}
          price={firstItem.price}
          loading={loading}
        />
      );
};