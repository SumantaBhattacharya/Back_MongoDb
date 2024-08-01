import mongoose from "mongoose"

// const mongoose = require('mongoose')
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/testDB");//${process.env.MONGODB_URL}/${DB_NAME}
        console.log(`\n MongoDB connected! DB HOST:${connectionInstance.connection.host}`);
    } catch (err) {
        console.log("MONGODB connection failed",err);
        process.exit(1)
    }
}

export default connectDB;



// module.exports = mongoose.model("User",userSchema)
