import mongoose, {Schema}from "mongoose"

const AddressSchema = new mongoose.Schema({
    city: String,
    state: String,
    country: String,
    street: String,
  });
  
  const UserSchema = new mongoose.Schema({
    gender: String,
    name: {
      first: String,
      last: String,
    },
    address: AddressSchema,
    email: String,
    age: Number,
    picture: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
    
export const User= mongoose.model("User", UserSchema)

