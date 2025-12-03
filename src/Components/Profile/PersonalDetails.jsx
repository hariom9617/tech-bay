import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  deleteAddress,
} from "../../redux/slices/addressSlice";
import AddressButtonForm from "./AddressButtonForm";
import EditAddressModal from "./EditAddressModal";

const PersonalDetails = ({ user, onImageChange }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { list: addresses, loading } = useSelector((state) => state.address);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onImageChange(file);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

      {/* PROFILE PHOTO + NAME */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-center">
          <img
            src={user?.image || "https://via.placeholder.com/90"}
            alt="Profile"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full object-cover border border-gray-300 cursor-pointer"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            className="text-blue-600 text-sm mt-2 font-medium hover:underline"
            onClick={handleImageClick}
          >
            Change Photo
          </button>
        </div>

        <div>
          <p className="text-lg font-semibold">{user?.username}</p>
          <p className="text-sm text-gray-600">User ID: {user?._id}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <button
            onClick={() => setOpenAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Add Address
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : addresses?.length === 0 ? (
          <p className="text-gray-500">No saved addresses found.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="border rounded-xl p-4 flex justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{addr.name}</p>
                  <p className="text-sm text-gray-700">{addr.address}</p>
                  <p className="text-sm text-gray-700">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-700">Mobile: {addr.mobile}</p>
                  <p className="text-sm text-gray-700">Type: {addr.type}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setEditAddressData(addr)}
                    className="px-3 py-1 bg-yellow-400 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => dispatch(deleteAddress(addr._id))}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD ADDRESS MODAL */}
      {openAddForm && (
        <AddressButtonForm
          open={openAddForm}
          handleClose={() => setOpenAddForm(false)}
        />
      )}

      {/* EDIT ADDRESS MODAL */}
      {editAddressData && (
        <EditAddressModal
          open={!!editAddressData}
          address={editAddressData}
          onClose={() => setEditAddressData(null)}
        />
      )}
    </div>
  );
};

export default PersonalDetails;
