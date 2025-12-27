import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import Loader from './Loader';
import EmptyState from './EmptyState';


function List({token}) {

  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

 const fetchList = async () => {
  try {
    setLoader(true);
    const response = await axios.get(backendUrl + "/api/product/list");
    if (response.data.success) {
      setList(response.data.products);
    } else {
      toast.error(response.data.msg);
    }
  } catch (err) {
    toast.error("Failed to load products");
  }finally{
    setLoader(false);
  }
};


const removeProduct = async (id) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/product/remove",
      { id },
      { headers: { token } }
    );

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchList();
    } else {
      toast.error(response.data.msg);
    }
  } catch (err) {
    toast.error(err.response?.data?.msg || "Delete failed");
  }
};



  useEffect(()=>{
    fetchList()
  },[])

  

  return (
    <div>
      <p className="mb-2">All Products List</p>

<div className="flex flex-col gap-2">

  {/* ------- List Table Title -------- */}

  <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
    <b>Image</b>
    <b>Name</b>
    <b>Category</b>
    <b>Price</b>
    <b className="text-center">Action</b>
  </div>

  {/* ------- Product List -------- */}
{loader ? (
  <Loader />
) : list.length == 0 ? <EmptyState text="No products added yet" /> : (
  list.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2"
    >
      <img className="w-12" src={item.image[0]} alt="" />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>{currency}{item.price}</p>
      <p
        onClick={() => removeProduct(item._id)}
        className="cursor-pointer text-center text-lg"
      >
        X
      </p>
    </div>
  ))
)}




</div>

    </div>
  )
}

export default List
