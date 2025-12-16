import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel";


const addProduct = async () => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1[0];
    const image2 = req.files.image2[0];
    const image3 = req.files.image3[0];
    const image4 = req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path);
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrl,
      sizes: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, msg: "Product Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err });
  }
};

const listProduct = async () => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err });
  }
};

const removeProduct = async () => {
  try {
    await productModel.findOneAndDelete(req.body.id);
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
