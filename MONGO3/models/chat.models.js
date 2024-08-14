// import mongoose from "mongoose"
const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema
({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        maxLength: 50
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now // Use default value
    }
},{timestamps:true})

const Chat = mongoose.model("Chat",chatSchema)

module.exports = Chat;