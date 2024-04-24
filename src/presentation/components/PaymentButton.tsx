import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (message:any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  onSuccess,
  onError,
}) => {
  console.log("🚀 ~ amount:", amount)
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AXpcEQVV0yB9ABT1xRJrAZjchVm06UdA2ah-DS9GLLa4YQRcvLAP_VcrhsDkRtZw1WEWi-5B_g0Fqz1b",
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({ "intent": "CAPTURE", "purchase_units": [ { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b", "amount": { "currency_code": "USD", "value": amount } } ], "payment_source": { "paypal": { "experience_context": { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", "brand_name": "EXAMPLE INC", "locale": "en-US", "landing_page": "LOGIN", "shipping_preference": "NO_SHIPPING", "user_action": "PAY_NOW", "return_url": "http://localhost:5173", "cancel_url": "http://localhost:5173" } } } });
        }}
        onApprove={(data:any, actions:any) => {
            return actions?.order?.capture().then(onSuccess);
          }}
        onError={onError}
        fundingSource={FUNDING.PAYPAL}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
