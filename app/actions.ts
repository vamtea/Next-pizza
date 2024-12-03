"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/component/shared/checkout/checkout-form-schema";
import { PayOrderTemplate } from "@/shared/component/shared/email-templates";
import { sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("cart token not found");
    }

    // get cart by token
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // if cart not find, return error 
    if (!userCart) {
      throw new Error("cart not found");
    }

    // if cart empty, return error
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // created an order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });


    // doing empty  cart`s
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    //  TODO: Created payment ways 

     await sendEmail(data.email, 'Next pizza | оплатите заказ №' + order.id, PayOrderTemplate({
      orderId: order.id,
      totalAmount: order.totalAmount,
      paymentUrl: 'https://github.com/vamtea/react-pizza-v2'
     }))
  } catch (err) {
    console.log('[CreatedOrder] Server error', err);
  }
}
