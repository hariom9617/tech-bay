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
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken, setUser } from "../redux/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.29.133:5000/login", data);

      if (response.status === 200) {
        const { access_token, refresh_token, user } = response.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);
          dispatch(setToken(access_token));
        }

        if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
        if (user) dispatch(setUser(user));

        alert("Login successful");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
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
      {/* Navbar */}
      <Box
        onClick={() => navigate("/")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 3,
          pl: 5,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Techbay
        </Typography>
      </Box>

      {/* Login Card */}
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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              fontFamily: "Inter, sans-serif",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>or</Divider>

          {/* Google Login Button */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              gap: 1,
              py: 1.2,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              fontFamily: "Inter, sans-serif",
              color: "#3c4043",
              borderColor: "#dadce0",
              "&:hover": {
                backgroundColor: "#ffffffff",
                borderColor: "#5c3535ff",
              },
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

          {/* Signup Section */}
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
        </Paper>
      </Box>
    </Box>
  );
}
