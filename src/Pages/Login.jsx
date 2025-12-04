import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  PhoneAndroid,
  LaptopMac,
  Headphones,
  Tv,
  TabletAndroid,
  Speaker,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, fetchUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const errorMessage = useSelector((state) => state.auth.error);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      await dispatch(fetchUserProfile());
      toast.success("Login Successful!");
      navigate("/");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        backgroundImage:
          "url('https://res.cloudinary.com/dliimops5/image/upload/v1764851197/techbay_checkout__shipping-Photoroom_weymin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", sm: "90%", md: "900px" },
          maxWidth: "95%",
          borderRadius: "20px",
          overflow: "hidden",

          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "260px", sm: "300px", md: "auto" },
            backgroundImage:
              "url('https://res.cloudinary.com/dliimops5/image/upload/v1764870101/Screenshot_2025-12-04_230450-Photoroom_vhh4jv.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            p: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "flex-end", md: "center" },
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, mb: { xs: 0.5, md: 1 } }}
          >
            Techbay
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: { xs: 1, md: 3 } }}
          >
            Smart Tech, Smarter Shopping.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 60px)",
              gap: { xs: 0.5, md: 1 },
              justifyContent: "center",
            }}
          >
            <PhoneAndroid sx={{ fontSize: { xs: 30, md: 40 } }} />
            <LaptopMac sx={{ fontSize: { xs: 30, md: 40 } }} />
            <Headphones sx={{ fontSize: { xs: 30, md: 40 } }} />
            <Speaker sx={{ fontSize: { xs: 30, md: 40 } }} />
            <Tv sx={{ fontSize: { xs: 30, md: 40 } }} />
            <TabletAndroid sx={{ fontSize: { xs: 30, md: 40 } }} />
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 360 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 800, textAlign: "center" }}
              >
                Login
              </Typography>

              <TextField
                label="Email Address or Username"
                type="text"
                fullWidth
                margin="normal"
                {...register("email", { required: true })}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                {...register("password", { required: true })}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {errorMessage && (
                <Typography color="error" sx={{ mt: 2, fontSize: 14 }}>
                  {errorMessage}
                </Typography>
              )}

              <Divider sx={{ my: 3 }}>or</Divider>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  gap: 1,
                  py: 1.2,
                  borderRadius: 2,
                }}
              >
                Continue with Google
                <Box
                  component="img"
                  src="https://techbay-um14.netlify.app/static/media/google_logo.e3727d762395819c0958.png"
                  sx={{ width: 20, height: 20, ml: 1 }}
                />
              </Button>

              <Typography sx={{ mt: 3, fontSize: 14, textAlign: "center" }}>
                New on Techbay?{" "}
                <Link underline="hover" onClick={() => navigate("/signup")}>
                  Sign Up
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
