import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseCart from "../../../hooks/UseCart";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const [client_secret, setClient_secret] = useState("");
  const [error, setError] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const { User } = UseAuth();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [cart] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate()

  useEffect(() => {

    if (totalPrice > 0 ) {
      axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        //console.log(res.data.client_secret);
        setClient_secret(res.data.client_secret);
      }); 
    }

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
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm a PaymentIntent

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            email: User?.email || "unknown",
            name: User?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      //console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionID(paymentIntent.id);

        const payment = {
          email: User.email,
          price: totalPrice,
          transactionID:paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };
      //  console.log(payment);

      //Using a Promise inside an if condition can be tricky because Promises are asynchronous.
        const res =await axiosSecure.post("/payment", payment);
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks , Your have successful paid",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/payment-history')
        } else {
          console.log("Payment does not exist.");
        }
      }
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
      {transactionID && (
        <p className=" text-green-700 font-semibold">
          {" "}
          Your setTransaction ID is : {transactionID}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
