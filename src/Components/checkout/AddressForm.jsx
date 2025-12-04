import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, addAddress } from "../../redux/slices/addressSlice";

const AddressForm = ({ nextStep }) => {
  const dispatch = useDispatch();

  const { list: savedAddresses, loading } = useSelector(
    (state) => state.address
  );

  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    type: "Home",
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addAddress(form)).then(() => {
      dispatch(fetchAddresses());
    });
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Shipping Address</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
 
        <div>
          <h2 className="text-lg font-semibold mb-3">Select a saved address</h2>

          {Array.isArray(savedAddresses) && savedAddresses.length > 0 ? (
            savedAddresses.map((addr) => (
              <label
                key={addr._id}
                className={`block p-4 rounded-xl border cursor-pointer mb-4 bg-white shadow-sm transition-all 
              ${
                selectedId === addr._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }
            `}
                onClick={() => setSelectedId(addr._id)}
              >
                <div className="flex items-start justify-between">

                  <div className="flex gap-3">
                    <input
                      type="radio"
                      checked={selectedId === addr._id}
                      onChange={() => setSelectedId(addr._id)}
                      className="mt-1.5 accent-blue-600"
                    />

                    <div className="leading-tight">
                      <p className="text-base font-semibold">{addr.name}</p>
                      <p className="text-gray-700 text-sm">{addr.address}</p>
                      <p className="text-gray-700 text-sm">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Mobile: {addr.mobile}
                      </p>
                      <p className="text-gray-600 text-sm">Type: {addr.type}</p>
                    </div>
                  </div>

                  <button className="text-gray-500 hover:text-gray-700 text-sm">
                    ✏️
                  </button>
                </div>
              </label>
            ))
          ) : (
            <p className="text-gray-500">No saved addresses found.</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">
            Or add a new shipping address
          </h2>

          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-sm space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2 placeholder:text-gray-400"
                value={form.name}
                onChange={handleInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="text"
                placeholder="Enter mobile number"
                className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2 placeholder:text-gray-400"
                value={form.mobile}
                onChange={handleInput}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address Line 1
              </label>
              <input
                id="address"
                type="text"
                placeholder="Street address, P.O. box"
                className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2 placeholder:text-gray-400"
                value={form.address}
                onChange={handleInput}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                  value={form.city}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Postal Code
                </label>
                <input
                  id="pincode"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                  value={form.pincode}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                  value={form.state}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={form.type}
                  onChange={handleInput}
                  className="w-full rounded-md border border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md font-semibold"
            >
              Save Address
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          disabled={!selectedId}
          onClick={() => nextStep(selectedId)}
          className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold disabled:bg-gray-400 hover:bg-blue-700 transition"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
