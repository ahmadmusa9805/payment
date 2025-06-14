import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);

useEffect(() => {
  axios.get('http://localhost:5000/subscription/subscriptionplans')
    .then(res => {
      console.log('Plans response:', res.data); // Add this line
      // setPlans(res.data);
      setPlans(res.data.plans);

    })
    .catch(err => {
      console.error('Error fetching plans:', err);
    });
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedPlan) return;

    setLoading(true);
    try {
      const { paymentMethod, error: payError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (payError) throw payError;

      const { data } = await axios.post('/subscription/create-subscription', {
        email,
        paymentMethodId: paymentMethod.id,
        planId: selectedPlan,
      });

      const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
      if (confirmError) throw confirmError;

      alert('Subscription successful!');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <select onChange={(e) => setSelectedPlan(e.target.value)} required>
        <option value="">Select a plan</option>
        {plans.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} – ${p.amount / 100}/{p.interval}
          </option>
        ))}
      </select>
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? 'Processing…' : 'Subscribe'}
      </button>
    </form>
  );
};

export default PaymentForm;
