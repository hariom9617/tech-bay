import React, { useState } from "react";
import { Icon } from "@mui/material";

const AddressForm = ({  addressData, setAddressData, nextStep }) => {
    console.log(addressData)
  const [selectedAddress, setSelectedAddress] = useState("John Doe");

  const savedAddresses = [
    { name: "John Doe", address: "123 Tech Lane, Silicon Valley, CA, 94043" },
    { name: "Jane Smith", address: "456 Circuit Board, Austin, TX, 78701" },
  ];

  const handleChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-center items-center px-4 sm:px-6 lg:px-10 py-4 bg-white shadow-md relative">
        <div className="flex items-center gap-5 text-2xl font-bold text-gray-800">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-blue-500"
          >
            <path
              d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
              fill="currentColor"
            ></path>
          </svg>
          TechBay
          </div>
          </nav>
      <div className="flex flex-wrap gap-3 ml-10 p-6">
        <span className="text-primary text-base font-medium">Shipping</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark">/</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark">Payment</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark">/</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark">Review</span>
      </div>

      <h2 className="text-4xl font-black text-text-primary-light dark:text-text-primary-dark pb-8">
        Shipping Address
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border">
        {/* Saved Addresses */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark px-4">
            Select a saved address
          </h3>
          <div className="flex flex-col gap-3 px-4">
            {savedAddresses.map((addr) => (
              <label
                key={addr.name}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  selectedAddress === addr.name ? "border-2 border-primary" : "border-border-light dark:border-border-dark"
                } bg-surface-light dark:bg-surface-dark cursor-pointer`}
              >
                <input
                  type="radio"
                  name="saved-address"
                  value={addr.name}
                  checked={selectedAddress === addr.name}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 rounded-full border-2 border-border-light dark:border-border-dark checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex flex-col grow">
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{addr.name}</p>
                  <p className="text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark">{addr.address}</p>
                </div>
                <button className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* New Address Form */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark px-4">
            Or add a new shipping address
          </h3>
          <form className="space-y-4 p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl">
            <div>
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="Name"
                placeholder="Enter your full name"
                type="text"
                value={addressData?.Name || ""}
                onChange={handleInputChange}
                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="address1">
                Address Line 1
              </label>
              <input
                id="address1"
                placeholder="Street address, P.O. box"
                type="text"
                value={addressData?.address1 || ""}
                onChange={handleInputChange}
                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="address2">
                Address Line 2 <span className="text-xs">(Optional)</span>
              </label>
              <input
                id="address2"
                placeholder="Apartment, suite, unit, building"
                type="text"
                value={addressData?.address2 || ""}
                onChange={handleInputChange}
                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={addressData?.city || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={addressData?.postalCode || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="country">
                  Country
                </label>
                <select
                  id="country"
                  value={addressData?.country || "United States"}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1" htmlFor="state">
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  value={addressData?.state || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary focus:ring-opacity-50 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center pt-2">
              <input
                id="saveAddress"
                type="checkbox"
                checked={addressData?.saveAddress || false}
                onChange={(e) => setAddressData({ ...addressData, saveAddress: e.target.checked })}
                className="h-4 w-4 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
              />
              <label htmlFor="saveAddress" className="ml-2 block text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Save this address for future orders
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-10 flex justify-end px-4">
        <button
          onClick={nextStep}
          className="w-full sm:w-auto rounded-lg bg-primary px-8 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
