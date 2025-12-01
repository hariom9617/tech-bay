import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/slices/addressSlice";

const AddressButtonForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

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

  const handleSubmit = () => {
    dispatch(addAddress({ token, address: form }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Address</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Address"
          multiline
          rows={2}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <TextField
          label="Mobile Number"
          type="number"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <TextField
          label="Alternate Mobile"
          type="number"
          onChange={(e) => setForm({ ...form, alternatemobile: e.target.value })}
        />

        <TextField
          label="City"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <TextField
          label="State"
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <TextField
          label="Pincode"
          type="number"
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />

        <TextField
          label="Type"
          select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleSubmit}>
          Save Address
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddressButtonForm;
