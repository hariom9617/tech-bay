// src/Components/Profile/EditAddressModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAddress, fetchAddresses } from "../../redux/slices/addressSlice";

const EditAddressModal = ({ open, onClose, address }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  useEffect(() => {
    if (address) {
      setForm({
        name: address.name || "",
        mobile: address.mobile || "",
        address: address.address || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        type: address.type || "Home",
      });
    }
  }, [address]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!address?._id) return onClose();

    // update using your thunk shape: { id, data }
    await dispatch(updateAddress({ id: address._id, data: form })).unwrap().catch(() => {
      // you can show toast if needed
    });

    // re-fetch addresses to keep UI consistent
    dispatch(fetchAddresses());

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

        <div className="grid grid-cols-1 gap-4">
          <input id="name" value={form.name} onChange={handleInput} className="border p-2 rounded" placeholder="Name" />
          <input id="mobile" value={form.mobile} onChange={handleInput} className="border p-2 rounded" placeholder="Mobile" />
          <textarea id="address" value={form.address} onChange={handleInput} className="border p-2 rounded" placeholder="Address" />
          <div className="grid grid-cols-2 gap-3">
            <input id="city" value={form.city} onChange={handleInput} className="border p-2 rounded" placeholder="City" />
            <input id="state" value={form.state} onChange={handleInput} className="border p-2 rounded" placeholder="State" />
          </div>
          <input id="pincode" value={form.pincode} onChange={handleInput} className="border p-2 rounded" placeholder="Pincode" />
          <select id="type" value={form.type} onChange={handleInput} className="border p-2 rounded">
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;