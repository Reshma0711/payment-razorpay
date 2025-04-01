import React from "react";
import { useSearchParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");

  return (
    <div className="success-container">
      <h2>🎉 Payment Successful! 🎉</h2>
      <p>Thank you for your purchase. Your payment was successful.</p>
      {paymentId && <p><strong>Payment ID:</strong> {paymentId}</p>}
      {orderId && <p><strong>Order ID:</strong> {orderId}</p>}
      <Link to="/" className="btn">Go to Home</Link>
    </div>
  );
};

export default PaymentSuccess;
