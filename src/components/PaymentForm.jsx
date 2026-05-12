import { useStripe, useElements,PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentForm = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault()
     if (!stripe || !elements) return;
    setProcessing(true);
   const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/orders`,
    },
    redirect: 'if_required',
  });

  if (error) {
    setError(error.message);
    setProcessing(false);
  } else {
    navigate('/orders');
  }
};
 

  return (
    <div>
      <form onSubmit={handlePayment}>
       
        <PaymentElement />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary mt-4"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
