import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


console.log(import.meta.env.VITE_STRIPE_KEY)

const Payment = () => {
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;
  console.log("clientSecret value:", clientSecret, "type:", typeof clientSecret);
  if (!clientSecret) return <div>Invalid payment session</div>;

  return (
    <div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;
