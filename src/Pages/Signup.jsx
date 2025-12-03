import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signup, fetchUserProfile } from "../redux/slices/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const errorMessage = useSelector((state) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.warn("Passwords do not match");
      // alert("Passwords do not match");
      return;
    }

    const result = await dispatch(
      signup({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
    );

    if (signup.fulfilled.match(result)) {
      await dispatch(fetchUserProfile()); 

       toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error(result.payload || "Signup failed");
      // alert(result.payload || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9fafb",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <Box
        onClick={() => navigate("/")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 3,
          pl: 5,
          cursor: "pointer",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
          Techbay
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 380,
            padding: 5,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 1000 }}>
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              {...register("name", { required: true })}
            />

            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              {...register("email", { required: true })}
            />

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
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                backgroundColor: "#007bff",
              }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {errorMessage && (
              <Typography color="error" sx={{ mt: 2, fontSize: 14 }}>
                {errorMessage}
              </Typography>
            )}
          </form>

          <Typography sx={{ mt: 3, fontSize: 14 }}>
            Already have an account?{" "}
            <Link underline="hover" onClick={() => navigate("/login")}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
