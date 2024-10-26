import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('your-publishable-key');
// const stripePromise = loadStripe(process.env?.publishable_key);
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Participate = ({ competitionId, entryFee }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    if (!stripe || !elements) return; // Ensure Stripe is loaded

    // Step 1: Create Payment Intent
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: entryFee, competitionId }),
    });
    const { clientSecret } = await res.json();

    // Step 2: Confirm the Payment using card details
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Actor Name' }, // Optional: Customize with actor's name
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('completed');
      
      // Step 3: Save Participation after successful payment
      // await fetch('/api/participate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ competitionId }),
      // });
    }
  };

  return (
    <div>
      <h2>Enter Competition</h2>
      <CardElement />
      <button onClick={handlePayment} disabled={!stripe}>Pay Entry Fee & Participate</button>
      {paymentStatus && <p>Status: {paymentStatus}</p>}
    </div>
  );
};

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <Participate competitionId="comp123" entryFee={500} />
    </Elements>
  );
}

//////////////////////////////////////
// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// // const stripePromise = loadStripe(process.env?.publishable_key);
// const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


// const Participate = ({ competitionId, entryFee }) => {
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   const handleWithdraw = async (prizeAmount) => {
//     const res = await fetch('/api/request-withdrawal', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: prizeAmount }),
//     });
  
//     if (res.ok) {
//       alert('Withdrawal request submitted!');
//     } else {
//       alert('Failed to submit withdrawal request.');
//     }
//   };

//   const handlePayment = async () => {
//     const stripe = await stripePromise;

//     // Step 1: Create payment intent from the backend
//     const res = await fetch('http://192.168.10.234:5000/api/v1/stripes/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount: entryFee, competitionId }),
//     });

//     const { clientSecret } = await res.json();

//     // Step 2: Confirm payment using Stripe
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (error) {
//       console.error('Payment failed', error);
//       setPaymentStatus('failed');
//     } else if (paymentIntent.status === 'succeeded') {
//       setPaymentStatus('completed');
      
//       // Step 3: Call API to save participation
//       // await fetch('/api/participate', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ competitionId }),
//       // });
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Pay Entry Fee & Participate</button>
//       {paymentStatus && <p>Status: {paymentStatus}</p>}
//     </div>
//   );
// };


// Participate.propTypes = {
//   competitionId: PropTypes.string.isRequired,
//   entryFee: PropTypes.number.isRequired,
// };
// export default Participate;









////////////////////////////////////////////////////////////////////////////////
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";


// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [paymentSucceeded, setPaymentSucceeded] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (!stripe || !elements) {
//     //   console.error("Stripe.js not loaded yet");
//     //   return;
//     // }

//     // Step 1: Get the card details from the form
//     const cardElement = elements.getElement(CardElement);

//     // Step 2: Create a Payment Intent on the backend
//     const res = await fetch(
//       //   "http://localhost:5000/api/v1/stripe/create-payment-intent",
//       "http://192.168.10.234:5000/api/v1/stripes/create-payment-intent",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ amount: 5000 }), // Example: $50 in cents
//         body: JSON.stringify({amount: 5000, competitionId:"671898eded96907fc67016e3" }),
//       }
//     );
//     const { data: clientSecret } = await res.json();
//     // const { clientSecret } = data;

//     console.log(clientSecret, "clientSecret from from data from server");
//     console.log(clientSecret, "clientSecret from server");

//     // Step 3: Confirm payment on the frontend
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: cardElement,
//         },
//       }
//     );

//     console.log(paymentIntent, "secret in frontend");

//     if (error) {
//       console.error("Error in payment confirmation:", error);
//       setErrorMessage(error.message);
//     } else {
//       console.log(paymentIntent, "secret in frontend");
//       if (paymentIntent.status === "succeeded") {
//         setPaymentSucceeded(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {/* Use CardElement with options to hide postal code */}
//         <CardElement

//         // if the postal code is not needed
//         //   options={{
//         //     style: { base: { fontSize: "16px" } },
//         //     hidePostalCode: true,
//         //   }}
//         />
//         <button type="submit" disabled={!stripe}>
//           Pay Now
//         </button>
//       </form>

//       {paymentSucceeded && <p>Payment succeeded!</p>}
//       {errorMessage && <p>Error: {errorMessage}</p>}
//     </div>
//   );
// };

// export default PaymentForm;
