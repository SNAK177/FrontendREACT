import { loadStripe } from '@stripe/stripe-js';

//eslint-disable-next-line no-undef

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? 'pk_test_fallback');

export default stripePromise;
