import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

const currency = "inr";
const delivery_charges = 10;

//Payment Gateway

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key missing in env");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const getRazorpay = () =>{
  if(!process.env.RAZORPAY_SECRET_KEY || !process.env.RAZORPAY_KEY_ID){
     throw new Error("Razorpay keys missing in env");
  }
  return new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
}



//Placing order through COD
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
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

//Verify stripe

const stripeVerify = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "paid",
      });

      await UserModel.findByIdAndUpdate(req.userId, {
        cartData: {},
      });

      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: false,
        status: "failed",
      });

      return res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const stripe = getStripe();
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const origin = req.headers.origin;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: delivery_charges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

//Placing order through Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const razorpayInstance = getRazorpay();
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    //  Razorpay order options
    const options = {
      amount: (amount + delivery_charges) * 100, // paisa
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    res.json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};


//verify Razorpay
const verifyRazorPay = async(req, res) =>{
  try{
    const razorpayInstance = getRazorpay();
    const {userId, razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment : true});
      await UserModel.findByIdAndUpdate(userId,{cartData : {}})
      res.json({success : true, message : 'Payment Successful'});
    }else{
      res.json({success: false, message : error.message})
    }

  }catch(error){
    console.log(error)
  }
}
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
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, msg: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  stripeVerify,
  verifyRazorPay,
};
