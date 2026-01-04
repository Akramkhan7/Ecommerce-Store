import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      fetchAllOrders(); 
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700"
          >
            {/* Parcel Icon */}
            <img src={assets.parcel_icon} alt="parcel" />

            {/* Items & Address */}
            <div>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} x {item.quantity} <span>{item.size}</span>
                </p>
              ))}

              <p className="font-medium mt-2">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-sm text-gray-600">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}
                </p>
              </div>

              <p className="text-sm">{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>
                Date : {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <p className="font-medium">
              {currency}
              {order.amount}
            </p>

            {/* Status */}
            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="border px-2 py-1 text-sm"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
