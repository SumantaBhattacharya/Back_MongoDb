/*
users           String
id              users pk
watchHistory    ObjectId[] videos
username        String
email           String
fullName        String
avatar          String
coverImage      String
password        String
refreshToken    String
createdAt       Date
updatedAt       Date

Videos
id             String
videoFile      String
thumbnail      String
owner          ObjectId users
titile         String
decription     String
duration       number
views          number
isPublished    boolean   
createdAt      Date
updatedAt      Date
*/

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type: String,//claudnery url
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },time:{
        type:Number,
        required: true
    },
    views:{
        type: Number,
        default:0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)

