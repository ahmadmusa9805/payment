import { useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function PaymentProcessor({ userId, card }) {
  const stripe = useStripe();
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  async function handlePay() {
    setProcessing(true);
    setMessage('');

    // 1. Create Payment Intent on backend
    const res = await fetch('http://localhost:5001/api/v1/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        cardId: card._id,
        amount: 1000, // e.g. $10.00 in cents
      }),
    });

    const data = await res.json();
console.log(data, 'musa - intent');
    if (data.error) {
      setMessage('Error creating payment: ' + data.error);
      setProcessing(false);
      return;
    }

    const clientSecret = data.data.clientSecret;
console.log(clientSecret, 'clientSecret');

    // 2. Confirm Payment on frontend (needed for some payment methods)
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);
 
    if (error) {
      setMessage('Payment failed: ' + error.message);
    } else if (paymentIntent.status === 'succeeded') {
     console.log('payment status succeeded');

      // 3. Process or update payment status of the booking on backend

      setMessage('Payment succeeded!');
    } else {
      setMessage('Payment status: ' + paymentIntent.status);
    }
    setProcessing(false);
  }

  return (
    <div>
      <button disabled={processing} onClick={handlePay}>
        {processing ? 'Processing...' : `Pay $10 with ${card.cardBrand.toUpperCase()} ****${card.last4}`}
      </button>
      {message && <div>{message}</div>}
    </div>
  );
}
