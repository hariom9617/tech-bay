// src/Components/Profile/AddressButtonForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress, fetchAddresses } from "../../redux/slices/addressSlice";
import { toast } from "react-toastify";

const AddressButtonForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    alternatemobile: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    // dispatch addAddress with the form object (this matches addressSlice)
    await dispatch(addAddress(form)).unwrap().catch(() => {
      // swallow here — you may want to show toast on error
    });

    // re-fetch addresses so the UI updates (this matches how AddressForm does it)
    dispatch(fetchAddresses());

    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40   z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Address</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <input id="name" placeholder="Full Name" onChange={handleInput} className="border rounded-lg p-2" />
          <textarea id="address" rows={2} placeholder="Address" onChange={handleInput} className="border rounded-lg p-2" />
          <input id="mobile" placeholder="Mobile Number" type="number" onChange={handleInput} className="border rounded-lg p-2" />
          <div className="grid grid-cols-2 gap-3">
            <input id="city" placeholder="City" onChange={handleInput} className="border rounded-lg p-2" />
            <input id="state" placeholder="State" onChange={handleInput} className="border rounded-lg p-2" />
          </div>
          <input id="pincode" placeholder="Pincode" type="number" onChange={handleInput} className="border rounded-lg p-2" />
          <select id="type" value={form.type} onChange={handleInput} className="border rounded-lg p-2">
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={handleClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Save Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressButtonForm;
