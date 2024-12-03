"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckoutSidebar, Container, Title } from "@/shared/component/shared";
import { useCart } from "@/shared/hooks";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/component/shared/checkout";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/component/shared/checkout/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {
  const { items, totalAmount, removeCartItem, updateItemQuantity, loading } =
    useCart();
  const [ submitting, setSubmitting ] = React.useState(false)
 
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true)
      
      const url = await createOrder(data);

      toast.error("Ваш заказ успешно оформлен! ", {
        icon: "(☞ﾟヮﾟ)☞",
      });

      // @ts-ignore
      if ( url) {
        location.href = url
      }
    } catch (err) {
      console.log(err)
      setSubmitting(false)
      toast.error("Неверный E-mail или пароль", {
        icon: "x",
      });
    }
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                loading={loading}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
              />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            {/* right left */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
