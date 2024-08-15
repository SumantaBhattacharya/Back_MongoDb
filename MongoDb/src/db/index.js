import mongoose from "mongoose"

// const mongoose = require('mongoose')
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);//${process.env.MONGODB_URL}/${DB_NAME}
        console.log(`\n MongoDB connected! DB HOST:${connectionInstance.connection.host}`);
        console.log(`Connected to DB: ${mongoose.connection.name}`); // Log the connected DB name
    } catch (err) {
        console.log("MONGODB connection  failed",err);
        process.exit(1)
    }
}

export default connectDB;

// here im learning new things when tab 

// it returns a promise 


// module.exports = mongoose.model("User",userSchema)

// explain this code heresgdffd fdfd