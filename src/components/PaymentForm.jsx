import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [{ isPending }] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const { currentUser } = useAuth();

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

    await updateUserScore(amount);

    toast.success('Payment successful!');
    setLoading(false);
  };

  const handlePayPalPayment = async (details, data) => {
    // Send details.id and amount to your server for processing
    // Example: await processPayment(details.id, amount);

    await updateUserScore(amount);

    toast.success('Payment successful!');
  };

  const updateUserScore = async (amount) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', currentUser.uid);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      const currentScore = userSnap.data().score || 0;
      const newScore = currentScore + parseFloat(amount);
      await updateDoc(userDoc, { score: newScore });
    }
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
        {isPending ? (
          <div>Loading PayPal...</div>
        ) : (
          <PayPalButtons
            amount={amount}
            onSuccess={handlePayPalPayment}
            options={{
              clientId: 'YOUR_PAYPAL_CLIENT_ID',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentForm;