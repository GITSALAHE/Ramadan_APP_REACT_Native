import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import StripeCheckout from "./stripe";
const stripePromise = loadStripe(
  "pk_test_51GxrgnJjT1M3ZAOSLSz7QMUEmhim5MKh9xcwOdQDwmZgMRZeefa7rkvolkuCidgx2wtmWAYeN3tI46FUt3xWIRfO00hb1onjbQ"
);

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout />
    </Elements>
  );
}
export default Checkout;
