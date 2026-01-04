import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Verfiy() {
  const { navigate, backendUrl, token, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const VerifyPayment = async () => {
    if (success === "false") {
      navigate("/cart");
      return;
    }

    try {
    if (!token || !orderId) return;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } } 
      );

      if (response.data.succes) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    VerifyPayment();
  }, [token]);
  return <div>Verifying Payment...</div>;
}

export default Verfiy;
