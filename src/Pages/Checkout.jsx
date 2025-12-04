import React, { useState } from "react";
import AddressForm from "../Components/checkout/AddressForm";
import PaymentForm from "../Components/checkout/PaymentForm";
import OrderConfirmation from "../Components/checkout/OrderConfirmation";

const Checkout = () => {
  const [step, setStep] = useState(1);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [paymentData, setPaymentData] = useState({});

  const nextStep = (addressId) => {
    if (step === 1 && addressId) {
      setSelectedAddressId(addressId);
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div  className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dliimops5/image/upload/v1764851197/techbay_checkout__shipping-Photoroom_weymin.png')",
      }}
      >
      <div className="w-full py-4 md:py-6 mb-6 md:mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-4">
 
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium
          ${step === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
        `}
            >
              Shipping
            </div>
          </div>

          <div className="hidden md:flex flex-1 border-t mx-4 border-gray-300"></div>
          <div className="md:hidden h-4 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium
          ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
        `}
            >
              Payment
            </div>
          </div>

          <div className="hidden md:flex flex-1 border-t mx-4 border-gray-300"></div>
          <div className="md:hidden h-4 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium
          ${step === 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
        `}
            >
              Confirmation
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <AddressForm
          nextStep={nextStep}
          selectedAddressId={selectedAddressId}
        />
      )}

      {step === 2 && (
        <PaymentForm
          selectedAddressId={selectedAddressId}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

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
