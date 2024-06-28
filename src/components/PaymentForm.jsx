import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalButton } from 'react-paypal-button-v2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Send paymentMethod.id and amount to your server for processing
    // Example: await processPayment(paymentMethod.id, amount);

    toast.success('Payment successful!');
    setLoading(false);
  };

  const handlePayPalPayment = (details, data) => {
    // Send details.id and amount to your server for processing
    // Example: await processPayment(details.id, amount);

    toast.success('Payment successful!');
  };

  return (
    <div>
      <h2 className="text-center text-2xl mb-4">Make a Payment</h2>
      <form onSubmit={handleStripePayment}>
        <div className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="card-element">Credit Card</Label>
          <CardElement id="card-element" />
        </div>
        <Button disabled={loading} type="submit">
          Pay with Credit Card
        </Button>
      </form>
      <div className="mt-4">
        <PayPalButton
          amount={amount}
          onSuccess={handlePayPalPayment}
          options={{
            clientId: 'YOUR_PAYPAL_CLIENT_ID',
          }}
        />
      </div>
    </div>
  );
};

export default PaymentForm;