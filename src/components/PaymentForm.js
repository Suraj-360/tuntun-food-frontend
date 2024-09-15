import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe('your-public-key'); // Replace with your actual public key

const PaymentForm = ({ onSuccess, onError, totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        // Call your backend to create a payment intent
        const { error: backendError, paymentIntent } = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: Math.round(totalAmount * 100) }) // Amount in paise
        }).then(res => res.json());

        if (backendError) {
            setLoading(false);
            setError(backendError.message);
            onError(backendError.message);
            return;
        }

        // Confirm the payment with Stripe
        const { error: stripeError, paymentIntent: intent } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setLoading(false);
        if (stripeError) {
            setError(stripeError.message);
            onError(stripeError.message);
        } else if (intent.status === 'succeeded') {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div className="payment-error">{error}</div>}  {/* Display error */}
        </form>
    );
};

const PaymentWrapper = ({ onSuccess, onError, totalAmount }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm
            onSuccess={onSuccess}
            onError={onError}
            totalAmount={totalAmount} // Pass the total amount to the PaymentForm
        />
    </Elements>
);

export default PaymentWrapper;
