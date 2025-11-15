import React, { useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, IconButton, InputAdornment, Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://192.168.29.133:5000/signup";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.status === 201) {
        if (response.data.access_token) localStorage.setItem("access_token", response.data.access_token);
        if (response.data.refresh_token) localStorage.setItem("refresh_token", response.data.refresh_token);
        alert("Account created successfully");
        reset();
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      <Box onClick={() => navigate("/")} sx={{ display: "flex", alignItems: "center", gap: 1, p: 3, pl: 5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1.4rem" }}>Techbay</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", pb: 8 }}>
        <Paper elevation={3} sx={{ width: 380, padding: 5, borderRadius: 4, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 1000 }}>Create an Account</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Full Name" fullWidth margin="normal" {...register("name", { required: true })} />
            <TextField label="Email Address" fullWidth margin="normal" {...register("email", { required: true })} />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              {...register("password", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              {...register("confirmPassword", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.2, fontWeight: 600, borderRadius: 2, textTransform: "none", backgroundColor: "#007bff" }} disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <Typography sx={{ mt: 3, fontSize: 14 }}>
            Already have an account? <Link underline="hover" onClick={() => navigate("/login")}>Sign In</Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
