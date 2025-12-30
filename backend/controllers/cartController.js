import userModel from "../models/userModel.js";



const addToCart = async (req, res) => {
  try {
    const { itemId, userId, size } = req.body;

    const userData = await userModel.findById({ itemId });
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
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById({ userId });
    let cartData = await userData.cartData;

    await userModel.findOneAndUpdate(itemId, { cartData });
    return res.json({ success: true, msg: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById({ userId });
    const cartData = await userData.cartData;

    return res.json({ success: true, cartData });
  } catch (err) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
