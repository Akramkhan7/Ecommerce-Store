import {v2 as cloudinary}from 'cloudinary';

const connectCloudinary = () =>{

    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key : process.env.CLODINARY_API_KEY,
        api_server : process.env.CLOUDINARY_SECERT,
    })
}
export default connectCloudinary;