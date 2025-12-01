import React, { useState } from "react";
import AddressForm from "../Components/checkout/AddressForm";
import PaymentForm from "../Components/checkout/PaymentForm";
import OrderConfirmation from "../Components/checkout/OrderConfirmation";

const Checkout = () => {
  const [step, setStep] = useState(1);

  // Address Data
  const [addressData, setAddressData] = useState({});
  // Payment Data
  const [paymentData, setPaymentData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-100">
      {step === 1 && (
        <AddressForm
          addressData={addressData}
          setAddressData={setAddressData}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <PaymentForm
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <OrderConfirmation
          address={addressData}
          payment={paymentData}
        />
      )}
    </div>
  );
};

export default Checkout;
