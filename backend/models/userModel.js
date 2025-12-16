import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
},{minimize:false});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);


export default UserModel;
