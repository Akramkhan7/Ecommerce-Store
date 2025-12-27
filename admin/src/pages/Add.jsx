import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        setDescription("");
        setName("");

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index}>
              <img
                className="w-20 cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select
          onChange={(e) => setSubCategory(e.target.value)}
          className="px-3 py-2"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2"
          type="number"
          placeholder="Price"
          required
        />
      </div>

      {/* Sizes */}
      <div className="flex gap-3 mt-2">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <div
            key={size}
            onClick={() =>
              setSizes((prev) =>
                prev.includes(size)
                  ? prev.filter((s) => s !== size)
                  : [...prev, size]
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              {size}
            </p>
          </div>
        ))}
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-3">
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label>Add to Bestseller</label>
      </div>

      {/* Submit */}
      <button className="bg-black text-white px-6 py-3 mt-4">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
