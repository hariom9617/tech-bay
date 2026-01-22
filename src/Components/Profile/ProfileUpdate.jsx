import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileUpdate = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(""); // frontend preview

  // Fetch user details
  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com/my-profile")
      .then((res) => {
        setUser(res.data.user);
        setPreviewUrl(res.data.user.profilePhoto); // initial photo
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setPhotoLoading(true); // start loader
    setFile(selectedFile);

    // frontend preview
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update text fields
      await axios.put("https://techbay-j8hr.onrender.com/update-profile", user);

      // Update photo if exists
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          "https://techbay-j8hr.onrender.com/update-profile-photo",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Set new image URL after upload
        setPreviewUrl(res.data.image);
        setUser((prev) => ({ ...prev, profilePhoto: res.data.image }));
      }

      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Update Profile</h2>

      {/* Profile Photo + Loader */}
      <div
        style={{
          width: "120px",
          height: "120px",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              filter: photoLoading ? "blur(3px)" : "none",
              transition: "0.3s",
            }}
            onLoad={() => setPhotoLoading(false)} // loader OFF when image loads
          />
        )}

        {photoLoading && (
          <CircularProgress
            size={40}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Change Profile Photo</label>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            width: "100%",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
