import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter((item) => item);

    const imageUrl = await Promise.all(
      images
        .filter((item) => item)
        .map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path);
          return result.secure_url;
        })
    );

    console.log("img url", imageUrl);
    console.log("img :", images);
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "At least one image is required",
      });
    }
    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrl,
      createdAt: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    console.log(product);
    await product.save();
    console.log(product);

    return res.json({ success: true, msg: "Product Added" });
 
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
  
   return res.json({ success: true, products });
  } catch (err) {
    return res.json({ success: false, msg: err });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, msg: "Product Deleted" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err.message });
  }
};

const singleProduct = async () => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
