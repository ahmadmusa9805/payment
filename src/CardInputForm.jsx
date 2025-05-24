import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CardInputForm({ userId, onCardSaved }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!stripe || !elements) {
      setErrorMsg('Stripe not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement, 'cardElement');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    console.log(paymentMethod, 'paymentMethod');

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Send PaymentMethod ID to backend to save
    const res = await fetch('http://localhost:5001/api/v1/cards/create-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, paymentMethodId: paymentMethod.id }),
    });

    const data = await res.json();

    console.log(data, 'data creating card flow');
    console.log( 'musa payment input form');

    if (data.error) {
      setErrorMsg(data.error);
      setLoading(false);
      return;
    }

    onCardSaved(data);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button disabled={loading || !stripe} type="submit">
        {loading ? 'Saving...' : 'Save Card'}
      </button>
      {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
    </form>
  );
}
