/*import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    video:{
        type: mongoose.Schema.Types.ObjectId,
        required: "Video"
    },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        required: "Comment" 
    },
    tweet:{
        type: mongoose.Schema.Types.ObjectId,
        required: "Tweet" 
    },
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: "User" 
    }
},{timestamps:true});
export const Like = mongoose.model("Like",likeSchema)*/

import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema({
    video:{
        type: Schema.Types.ObjectId,
        required: "Video"
    },
    comment:{
        type: Schema.Types.ObjectId,
        required: "Comment" 
    },
    tweet:{
        type: Schema.Types.ObjectId,
        required: "Tweet" 
    },
    likedBy:{
        type: Schema.Types.ObjectId,
        required: "User" 
    }
},{timestamps:true});
export const Like = mongoose.model("Like",likeSchema)

/*
likes
id           string pk
comment      objectId comments
createdAt    Date
video        objectId videos
updatedAt    Date
likedBy      objectId users
tweet        objectId tweets
*/