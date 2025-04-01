import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div className="failure-container">
      <h2>❌ Payment Failed ❌</h2>
      <p>Oops! Something went wrong. Your payment was not successful.</p>
      
      <Link to="/" className="btn">Try Again</Link>
    </div>
  );
};

export default PaymentFailure;
