import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, addAddress } from "../../redux/slices/addressSlice";
import EditIcon from "@mui/icons-material/Edit";
import EditAddressModal from "../Profile/EditAddressModal";

const AddressForm = ({ nextStep }) => {
  const dispatch = useDispatch();
  const { list: savedAddresses } = useSelector((state) => state.address);

  const [selectedId, setSelectedId] = useState(null);

  // State for modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

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
      setForm({
        name: "",
        mobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        type: "Home",
      });
    });
  };

  const handleEditClick = (addr) => {
    setEditingAddress(addr);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Shipping Address</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Saved Addresses */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Select a saved address</h2>

          {Array.isArray(savedAddresses) && savedAddresses.length > 0 ? (
            savedAddresses.map((addr) => (
              <label
                key={addr._id}
                className={`block p-4 rounded-xl border cursor-pointer mb-4 bg-white shadow-sm transition-all ${
                  selectedId === addr._id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
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
                      <p className="text-gray-600 text-sm">Mobile: {addr.mobile}</p>
                      <p className="text-gray-600 text-sm">Type: {addr.type}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(addr);
                    }}
                  >
                    <EditIcon />
                  </button>
                </div>
              </label>
            ))
          ) : (
            <p className="text-gray-500">No saved addresses found.</p>
          )}
        </div>

        {/* Add New Address */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Add a new shipping address</h2>

          <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-sm space-y-4">
            <input
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border p-2"
              value={form.name}
              onChange={handleInput}
            />
            <input
              id="mobile"
              placeholder="Mobile Number"
              className="w-full rounded-md border p-2"
              value={form.mobile}
              onChange={handleInput}
            />
            <input
              id="address"
              placeholder="Address"
              className="w-full rounded-md border p-2"
              value={form.address}
              onChange={handleInput}
            />
            <input
              id="city"
              placeholder="City"
              className="w-full rounded-md border p-2"
              value={form.city}
              onChange={handleInput}
            />
            <input
              id="state"
              placeholder="State"
              className="w-full rounded-md border p-2"
              value={form.state}
              onChange={handleInput}
            />
            <input
              id="pincode"
              placeholder="Pincode"
              className="w-full rounded-md border p-2"
              value={form.pincode}
              onChange={handleInput}
            />
            <select
              id="type"
              value={form.type}
              onChange={handleInput}
              className="w-full rounded-md border p-2"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
            </select>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-2 rounded-md"
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
          className="bg-blue-600 text-white px-10 py-3 rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
        >
          Continue to Payment
        </button>
      </div>

      {/* Edit Address Modal */}
      {editingAddress && (
        <EditAddressModal
          open={editModalOpen}
          onClose={closeEditModal}
          address={editingAddress}
        />
      )}
    </div>
  );
};

export default AddressForm;
