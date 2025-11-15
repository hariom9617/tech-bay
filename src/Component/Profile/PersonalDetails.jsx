import React from "react";
import { Card, CardContent, Avatar, Box, Typography, Button } from "@mui/material";

const PersonalDetails = ({ user }) => {
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
          {/* Left: Avatar + Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={user?.image || ""}
              alt={user?.username || "User"}
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                bgcolor: "#f0f0f0",
                border: "2px solid #e0e0e0",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1.3,
                }}
              >
                {user?.username || "User Name"}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 15,
                }}
              >
                User ID: {user?._id || "N/A"}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 15,
                }}
              >
                {user?.email || "email@example.com"}
              </Typography>
            </Box>
          </Box>

          {/* Right: Edit Button */}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
