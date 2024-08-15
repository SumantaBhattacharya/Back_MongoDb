import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async(req,res,next)=>{// res = _ 

    try {
        // returning response in  user.controller of login function
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorised Request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken ")
        // in generateAccessToken we made _id
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;// creatinga user object
    
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token ")
    }
})
// export {verifyJWT}
// verify user exists or not
// when we write middlewere we write next() as a parameter
// Authorization: Bearer <token>
// access token
// hearder name Authorization is a token
// https://jwt.io/introduction
