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

          flexDirection: { xs: "column-reverse", md: "row" },

          width: { xs: "100%", sm: "90%", md: "900px" },
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 360 }}>

            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 800,
                textAlign: "center",
                mb: 1,
              }}
            >
              Create an Account
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                mb: 3,
                color: "rgba(0,0,0,0.6)",
                fontSize: "0.95rem",
              }}
            >
              Start exploring the best tech deals.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                {...register("name", { required: true })}
                InputLabelProps={{
                  sx: { ml: -0.5 },
                }}
                InputProps={{
                  sx: {
                    height: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  },
                }}
              />

              <TextField
                label="Email Address"
                fullWidth
                margin="normal"
                {...register("email", { required: true })}
                InputLabelProps={{
                  sx: { ml: -0.5 },
                }}
                InputProps={{
                  sx: {
                    height: "45px",
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
                InputLabelProps={{
                  sx: { ml: -0.5 },
                }}
                InputProps={{
                  sx: {
                    height: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  },
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
                InputLabelProps={{
                  sx: { ml: -0.5 , },
                }}
                InputProps={{
                  sx: {
                    height: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                  },
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
                  py: 1.3,
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  my: 3,
                }}
              />

              <Typography sx={{ textAlign: "center", fontSize: 14 }}>
                Already have an account?{" "}
                <Link
                  underline="hover"
                  onClick={() => navigate("/login")}
                  sx={{ cursor: "pointer", fontWeight: 600 }}
                >
                  Login
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "300px", sm: "350px", md: "auto" },
            backgroundImage:
              "url('https://res.cloudinary.com/dliimops5/image/upload/v1764870101/Screenshot_2025-12-04_230450-Photoroom_vhh4jv.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 2, md: 4 },
          }}
        >

          <Box
            sx={{
              textAlign: "center",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.3rem", md: "1.6rem" },
                fontWeight: 800,
              }}
            >
              TechBay
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 800,
              }}
            >
              Join TechBay —
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontWeight: 600,
                opacity: 0.9,
              }}
            >
              Your Tech Journey Starts Here.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
