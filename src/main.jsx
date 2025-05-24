import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// src/index.js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe(
  // "pk_test_51QEnVAEEk4mIYr3lIhzTezoUgWsx1XMl0J36lZlLHuTEd6MqTenDjtLols6unn2kEBUBWEvfWXnlljv753mAUBnQ00z7kXHyj3"
  // "pk_test_51Q39yWKtptY97ivHSkOa26Z7v7MNDVtlyxkyGXlc1v43UQ5vA0G7K5AbPUxHR15cGtYJ5VVfBMT48kknegA1O5H500wpAPLVuO"
  "pk_test_51QEnVAEEk4mIYr3lIhzTezoUgWsx1XMl0J36lZlLHuTEd6MqTenDjtLols6unn2kEBUBWEvfWXnlljv753mAUBnQ00z7kXHyj3"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
);
