import userModel from "../models/userModel.js";



const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, msg: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    // If quantity is 0 → remove item
    if (quantity === 0) {
      delete cartData[itemId]?.[size];

      if (Object.keys(cartData[itemId] || {}).length === 0) {
        delete cartData[itemId];
      }
    } 
    // Else → set quantity directly
    else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: error.message });
  }
};


const getUserCart = async (req, res) => {
  try {
    const  userId  = req.userId;
    const userData = await userModel.findById( userId );
    const cartData = await userData.cartData;

    return res.json({ success: true, cartData : userData.cartData || {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
