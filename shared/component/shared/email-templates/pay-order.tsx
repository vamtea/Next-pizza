import * as React from "react";

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ #{orderId}</h1>
    <p>
      Сумма заказа: <b>{totalAmount} ₽</b>. Перейдите{" "}
      <a href={paymentUrl}>по ссылке сюда</a> для оплаты заказа
    </p>
  </div>
);
