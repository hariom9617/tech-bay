import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.orders || {});

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        mb: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          My Orders
        </Typography>

        {loading && (
          <Typography sx={{ textAlign: "center", my: 2 }}>
            Loading orders...
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
            {error}
          </Typography>
        )}

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          order.status === "Delivered"
                            ? "green"
                            : order.status === "Pending"
                            ? "orange"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MyOrders;
