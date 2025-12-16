import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress, fetchAddresses } from "../../redux/slices/addressSlice";
import { toast } from "react-toastify";
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

  const states = State.getStatesOfCountry("IN");
  const cities = form.state ? City.getCitiesOfState("IN", form.state) : [];

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setForm({ ...form, state: e.target.value, city: "" }); // reset city when state changes
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addAddress(form)).unwrap();
      dispatch(fetchAddresses());
      toast.success("Address added successfully!");
      handleClose();
    } catch (err) {
      toast.error("Failed to add address!");
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">Add New Address</Typography>
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
              label="Address"
              fullWidth
              multiline
              rows={2}
              name="address"
              value={form.address}
              onChange={handleInput}
              
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              fullWidth
              name="mobile"
              type="number"
              value={form.mobile}
              onChange={handleInput}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="State"
              fullWidth
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

          <Grid item xs={6}>
            <TextField
              select
              label="City"
              fullWidth
              name="city"
              value={form.city}
              onChange={handleInput}
              disabled={!form.state} // disable until state selected
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
              select
              label="Type"
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
        <Button onClick={handleClose} color="inherit" variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressButtonForm;
