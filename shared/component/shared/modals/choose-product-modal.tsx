"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "..";
import { cn } from "@/shared/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  // const onAddProduct = () => {
  //   addCartItem({
  //     productItemId: firstItem.id,
  //   })
  // }
  // const onAddPizza = async (productItemId: number, ingredients: number[]) => {
  //   try {
  //     await addCartItem({
  //       productItemId,
  //       ingredients,
  //     });
  //     toast.success('Пицаа добавлена в корзину')
  //     router.back()
  //   } catch (error) {
  //     toast.error('не удалось добавить пиццу в корзину')
  //   }
  // }
  

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogTitle>
          <VisuallyHidden>Мой доступный заголовок</VisuallyHidden>
        </DialogTitle>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
