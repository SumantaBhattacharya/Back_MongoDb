import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// import mongoose, {Schema} from "mongoose";
// const userSchema = new Schema({},{})
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, // claudinary url
        required: true
    },
    coverImage:{
        type: String
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required:[true,`Password is required`]
    },
    refreshToken:{
        type: String
    }
},{timestamps:true})

// hook
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()// it every time modifies the password to prevent that we are using the upper line
})// arrow function dont get the this reference

userSchema.methods.ispasswordCorrect = async function (password) {//user.password
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}// short lived

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}// long lived

export const User = mongoose.model("User",userSchema)

/*
jwt is a bearer token
AccessToken & RefreshToken are both jwt but their usage are different

[]

users         
id               string id
watchHistory     objectId videos
username         string
email            string
fullname         string
avatar           string
coverImage       string
password         string
refreshtoken     string
access token     string
createdAt        date
updatedAt        date

videos 
id              string pk
videoFile       string
thumnail        objectId
owner           objectId users
title           string
decription      string
duration        number
views           number
isPublished     boolean
createdAt       date
updatedAt       date

subscription
id           string pk
subscriber   number
channel      objectId users
createdAt    date
updatedAt    date

tweets
id          string pk
owner       objectId users
content     string
createdAt   date
updatedAt   date


*/