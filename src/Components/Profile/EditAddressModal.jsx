import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAddress, fetchAddresses } from "../../redux/slices/addressSlice";
import { State, City } from "country-state-city";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography
} from "@mui/material";

const EditAddressModal = ({ open, onClose, address }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    type: "Home",
  });

  // Load all Indian states
  const states = State.getStatesOfCountry("IN");

  // Load cities dynamically based on selected state
  const cities = form.state ? City.getCitiesOfState("IN", form.state) : [];

  // Pre-fill form with old address
  useEffect(() => {
    if (address) {
      setForm({
        name: address.name || "",
        mobile: address.mobile || "",
        address: address.address || "",
        state: address.stateCode || "",
        city: address.city || "",
        pincode: address.pincode || "",
        type: address.type || "Home",
      });
    }
  }, [address]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setForm({ ...form, state: e.target.value, city: "" }); // reset city when state changes
  };

  const handleSubmit = async () => {
    if (!address?._id) return onClose();

    await dispatch(updateAddress({ id: address._id, data: form }))
      .unwrap()
      .catch(() => {});

    dispatch(fetchAddresses());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Edit Address
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              name="name"
              value={form.name}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              fullWidth
              name="mobile"
              value={form.mobile}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={2}
              name="address"
              value={form.address}
              onChange={handleInput}
            />
          </Grid>

          {/* STATE Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="State"
              name="state"
              value={form.state}
              onChange={handleStateChange}
                 sx={{ minWidth: "220px", maxWidth: "250px" }}
            >
              {states.map((s) => (
                <MenuItem key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* CITY Dropdown */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="City"
              name="city"
              value={form.city}
              onChange={handleInput}
              disabled={!form.state} // disable 
                 sx={{ minWidth: "220px", maxWidth: "250px" }}
            >
              {cities.map((c) => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Pincode"
              fullWidth
              name="pincode"
              value={form.pincode}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Type"
              select
              fullWidth
              name="type"
              value={form.type}
              onChange={handleInput}
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressModal;
