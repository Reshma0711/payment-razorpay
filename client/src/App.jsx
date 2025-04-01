import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/successPage";
import PaymentFailure from "./pages/failurePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailure />} />
      </Routes>
    </Router>
  );
}

export default App;
