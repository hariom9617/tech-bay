import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  deleteAddress,
} from "../../redux/slices/addressSlice";
import AddressButtonForm from "./AddressButtonForm";
import EditAddressModal from "./EditAddressModal";
import DeleteConfirmModal from "./DeleteModel";
import { toast } from "react-toastify";
import { Camera, Pencil, Trash2, Plus, MapPin, Phone } from "lucide-react";

const PersonalDetails = ({ user, onImageChange }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { list: addresses, loading } = useSelector((state) => state.address);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


 const handleConfirmDelete = () => {
  if (selectedAddressId) {
    dispatch(deleteAddress(selectedAddressId))
      .unwrap()
      .then(() => {
        toast.success("Address deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete address!");
      });
  }

  setOpenDelete(false);
  setSelectedAddressId(null);
};


  // const handleDelete = () => {
  //   dispatch(deleteAddress(address._id));
  //   setOpenDelete(false);
  // };


  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onImageChange(file);
  };

  return (
    <div className="space-y-6">
      {/* PROFILE PHOTO + NAME CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Personal Details</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <img
              src={user?.image || "https://via.placeholder.com/90"}
              alt="Profile"
              onClick={handleImageClick}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-50 cursor-pointer"
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-md hover:bg-brand-600 transition-colors"
              aria-label="Change photo"
            >
              <Camera size={15} />
            </button>
          </div>

          <div className="text-center sm:text-left sm:pt-2">
            <p className="text-xl font-bold text-slate-900">{user?.username}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <button
              className="text-brand-600 text-sm mt-3 font-semibold hover:underline"
              onClick={handleImageClick}
            >
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* ADDRESS SECTION CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-900">Saved Addresses</h3>
          <button
            onClick={() => setOpenAddForm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-semibold shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="skeleton h-28 rounded-xl"></div>
            ))}
          </div>
        ) : addresses?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <MapPin size={28} />
            </div>
            <p className="text-slate-500">No saved addresses found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="relative border border-slate-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-soft transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base font-bold text-slate-900">
                    {addr.name}
                  </p>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                    {addr.type}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {addr.address}
                </p>
                <p className="text-sm text-slate-600">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                  <Phone size={13} /> {addr.mobile}
                </p>

                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setEditAddressData(addr)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAddressId(addr._id);
                      setOpenDelete(true);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={14} />
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
      {<DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Address"
        message="Are you sure you want to delete this address?"
      />}

    </div>
  );
};

export default PersonalDetails;