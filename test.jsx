import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js not loaded yet");
      return;
    }

    // Step 1: Get the card details from the form
    const cardElement = elements.getElement(CardElement);


    // Step 2: Create a Payment Intent on the backend
    const res = await fetch(
        "http://localhost:5000/api/v1/stripes/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ competitionId:"671898eded96907fc67016e3"}),
      }
    );

    const { data: clientSecret} = await res.json();

    // Step 3: Confirm payment on the frontend
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error in payment confirmation:==========", error);
      setErrorMessage(error.message);
    } else {
      console.log(paymentIntent, "secret in frontend");
      if (paymentIntent.status === "succeeded") {
        setPaymentSucceeded(true);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
        // if the postal code is not needed
          options={{
            style: { base: { fontSize: "16px" } },
            hidePostalCode: true,
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>

      {paymentSucceeded && <p>Payment succeeded!</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default PaymentForm;
