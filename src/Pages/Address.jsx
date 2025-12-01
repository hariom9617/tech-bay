import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../redux/addressSlice";
import { Card, CardContent, Typography } from "@mui/material";
import Navbar from '../Components/layout/Navbar';

const Address = () => {
  const { list, loading, error } = useSelector((state) => state.address);

  console.log("Address Data:", list);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const safeList = Array.isArray(list) ? list : list?.address || [];

  if (!safeList.length) return <div>No addresses found</div>;

  return (<>
    {/* <Navbar></Navbar> */}
    <div className=" border-2 p-4 " >
      {safeList.map((addr) => (
          <div key={addr._id}>
          <h3>{addr.name}</h3>
          <p>{addr.address}</p>
          <p>{addr.city}, {addr.state} - {addr.pincode}</p>
          <p>Mobile: {addr.mobile}</p>
          <p>Type: {addr.type}</p>
        </div>
      ))}
    </div>
      </>
  );
};

export default Address;