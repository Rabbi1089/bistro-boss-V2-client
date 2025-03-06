import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseCart from "../../../hooks/UseCart";

const CheckoutForm = () => {
  const stripe = useStripe();
  const [client_secret, setClient_secret] = useState("");
  const [error, setError] = useState("");

  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [cart] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  

  useEffect(() => {
    axiosSecure.post("/create-payment-intent" , { price: totalPrice}).then((res) => {
      //console.log(res.data.client_secret);
      setClient_secret(res.data.client_secret);
    });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-md btn-primary my-5"
        type="submit"
        disabled={!stripe || !client_secret}
      >
        Pay
      </button>
      <p className=" text-red-600">{error}</p>
    </form>
  );
};

export default CheckoutForm;
