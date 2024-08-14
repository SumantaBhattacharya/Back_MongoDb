// import mongoose from "mongoose";
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/authtestapp");

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    age: Number,

},{timestamps:true})

// export const User = mongoose.model("User",userSchema);
module.exports = mongoose.model("User",userSchema);