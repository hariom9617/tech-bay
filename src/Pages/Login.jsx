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
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
      // alert("Login Successful!");

      navigate("/");
    } else {
      toast.error(result.payload || "Login failed");
      // alert(result.payload || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f8fa",
        fontFamily: "Inter, sans-serif",
      }}
    >
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
            padding: 5,
            width: 380,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 1000,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Login
            </Typography>

            <TextField
              label="Email Address or Username"
              placeholder="you@example.com"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              {...register("email", { required: true })}
            />

            <TextField
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              margin="normal"
              {...register("password", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
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
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
              }}
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
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 2,
                color: "#3c4043",
                borderColor: "#dadce0",
              }}
            >
              Continue with Google
              <Box
                component="img"
                src="https://techbay-um14.netlify.app/static/media/google_logo.e3727d762395819c0958.png"
                alt="Google logo"
                sx={{ width: 20, height: 20, mr: 1 }}
              />
            </Button>

            <Typography sx={{ mt: 3, fontSize: 14 }}>
              Don’t have an account?{" "}
              <Link
                underline="hover"
                onClick={() => navigate("/signup")}
                sx={{ cursor: "pointer" }}
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
