import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
