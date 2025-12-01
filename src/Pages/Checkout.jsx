import React, { useState } from "react";
import AddressForm from "../Components/checkout/AddressForm";
import PaymentForm from "../Components/checkout/PaymentForm";
import OrderConfirmation from "../Components/checkout/OrderConfirmation";

const Checkout = () => {
  const [step, setStep] = useState(1);

  // This will store just the selected address _id
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Payment data (if you want to store payment ID or method later)
  const [paymentData, setPaymentData] = useState({});

  // Move to next step
  const nextStep = (addressId) => {
    if (step === 1 && addressId) {
      setSelectedAddressId(addressId); // Save selected address ID
    }
    setStep((prev) => prev + 1);
  };

  // Move one step back
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* STEP 1 — ADDRESS SELECTION */}
      {step === 1 && (
        <AddressForm
          nextStep={nextStep}
          selectedAddressId={selectedAddressId}
        />
      )}

      {/* STEP 2 — PAYMENT */}
      {step === 2 && (
        <PaymentForm
          selectedAddressId={selectedAddressId}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {/* STEP 3 — ORDER CONFIRMATION */}
      {step === 3 && (
        <OrderConfirmation
          addressId={selectedAddressId}
          payment={paymentData}
        />
      )}
    </div>
  );
};

export default Checkout;
