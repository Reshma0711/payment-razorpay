import React, { useState } from "react";
import { createOrder, verifyPayment } from "../services/api";
import { useNavigate } from "react-router-dom"; 
import "../../src/App.css"


const Payment = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order
      const orderData = await createOrder({ amount, currency: "INR" });

      if (!orderData || !orderData.order) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: "rzp_test_qpA16uqhKeWAIJ",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: "My E-Commerce Store",
        description: "Payment for order",
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Verify and capture payment
          const verifyData = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          };

          console.log("verifyyyyyyyyyyyyyy", verifyData);

          const result = await verifyPayment(verifyData);

          console.log("resultttttttttttttt", result);

          if (result.message === "Payment captured successfully") {
            // alert("Payment Successful!");
            navigate(`/payment-success?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}`)

          } else {
            alert("Payment Verification Failed!");
            navigate("/payment-failed")
          }
        },

        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "My E-Commerce Store, India",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Error while initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Pay with Razorpay</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
