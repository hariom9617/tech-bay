import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AddressButtonForm from "../AddressButtonForm";

const PersonalDetails = ({ user, onImageChange }) => {
  const fileInputRef = useRef(null);
  const [openForm, setOpenForm] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.300",
        p: 2,
        mb: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={user?.image || ""}
                alt={user?.username || "User"}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  bgcolor: "#f0f0f0",
                  border: "2px solid #e0e0e0",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />

              <Button
                variant="text"
                size="small"
                onClick={handleImageClick}
                sx={{ mt: 1, textTransform: "none" }}
              >
                Change Photo
              </Button>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                Username: {user?.username || "User Name"}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                User ID: {user?._id || "N/A"}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {user?.email || "email@example.com"}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "#f4f4f4" },
            }}
          >
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "#f4f4f4" },
            }}
            onClick={() => setOpenForm(true)}
          >
            Add Address
          </Button>

          {openForm && (
            <AddressButtonForm
              open={openForm}
              handleClose={() => setOpenForm(false)}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
