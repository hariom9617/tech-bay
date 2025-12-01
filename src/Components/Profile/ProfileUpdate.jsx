import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileUpdate = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);

  // Fetch user details
  useEffect(() => {
    axios.get("https://techbay-1ej5.onrender.com/my-profile")
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // For text fields
    await axios.put("https://techbay-1ej5.onrender.com/update-profile", user);

    // For profile photo
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      await axios.post("https://techbay-1ej5.onrender.com/update-profile-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    }

    alert("Profile Updated Successfully!");
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Update Profile</h2>

      {/* Current Profile Photo */}
      {user.profilePhoto && (
        <img 
          src={user.profilePhoto} 
          alt="profile" 
          style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "20px" }}
        />
      )}

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

        <button type="submit" style={{ padding: "10px 20px", width: "100%", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          Update Profile
        </button>

      </form>
    </div>
  );
};

export default ProfileUpdate;
