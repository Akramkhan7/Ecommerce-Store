import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

//Placing order through COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, msg: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, msg: error.message });
  }
};

//Placing order through Stripe
const placeOrderStripe = async (req, res) => {};

//Placing order through Razorpay
const placeOrderRazorpay = async (req, res) => {};

//All orders data for Admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//User data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.findById({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status from Admin Panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
