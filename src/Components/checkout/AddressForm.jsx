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
    alternateMobile: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>

      {/* -------- SAVED ADDRESSES -------- */}
      {Array.isArray(savedAddresses) && savedAddresses.length > 0 ? (
        savedAddresses.map((addr) => (
          <label
            key={addr._id}
            className={`block p-4 border rounded-lg cursor-pointer mb-3 ${
              selectedId === addr._id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedId(addr._id)}
          >
            <div className="flex gap-3">
              <input
                type="radio"
                checked={selectedId === addr._id}
                onChange={() => setSelectedId(addr._id)}
                className="mt-1"
              />

              <div>
                <p className="text-lg font-semibold">{addr.name}</p>
                <p className="text-sm text-gray-700">{addr.address}</p>
                <p className="text-sm text-gray-700">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-sm text-gray-700">Mobile: {addr.mobile}</p>
                <p className="text-sm text-gray-700">Type: {addr.type}</p>
              </div>
            </div>
          </label>
        ))
      ) : (
        <p className="text-gray-500">No saved addresses found.</p>
      )}

      {/* -------- ADD NEW ADDRESS -------- */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Or add a new address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
          <input
            id="name"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={handleInput}
          />
          <input
            id="mobile"
            placeholder="Phone Number"
            className="border p-2 rounded"
            value={form.mobile}
            onChange={handleInput}
          />
          <input
            id="alternateMobile"
            placeholder="Alternate Number"
            className="border p-2 rounded"
            value={form.alternateMobile}
            onChange={handleInput}
          />
          <input
            id="address"
            placeholder="Address"
            className="border p-2 rounded"
            value={form.address}
            onChange={handleInput}
          />
          <input
            id="city"
            placeholder="City"
            className="border p-2 rounded"
            value={form.city}
            onChange={handleInput}
          />
          <input
            id="state"
            placeholder="State"
            className="border p-2 rounded"
            value={form.state}
            onChange={handleInput}
          />
          <input
            id="pincode"
            placeholder="Pincode"
            className="border p-2 rounded"
            value={form.pincode}
            onChange={handleInput}
          />
          <button
            className="bg-blue-600 text-white py-2 rounded font-semibold col-span-2"
            onClick={handleSubmit}
          >
            Save Address
          </button>
        </div>

        <button
          disabled={!selectedId}
          onClick={nextStep}
          className="bg-green-600 text-white px-6 py-3 rounded mt-6 font-semibold disabled:bg-gray-400"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default AddressForm;