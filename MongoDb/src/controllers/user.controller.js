import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
// import { User } from "../models/user.models"
import { UploadOnClodinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResposne.js";
import jwt from "jsonwebtoken"
// import { Subscription } from "../models/subscriptions.models.js";
import mongoose from "mongoose";
// import mongoose from "mongoose";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()//methods
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken// saved in db so that we dont have to ask the password from the usermultiple times
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }



    } catch (error) {
        throw new ApiError(500, "Something went wrong due to generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { fullname, email, username, password } = req.body
    //console.log("email: ", email);
    // get user details from front-end

    // validation(validate) - empty
    // if (fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // }

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username,email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    // check for images
    // multiple options
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await UploadOnClodinary(avatarLocalPath)
    const coverImage = await UploadOnClodinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // craete a user obejct - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {

    //  Todo's for login :-
    //  take input from the user from the login page. req.body -> data
    //  save it in a variable {usernaer,email} = req.body
    //  find the user userModel.findOne(email: email)
    //  apply password and username check ( as per js series form handling part ) if the username === username && password === password . Then perform some action.
    //  if not then pass error if yes then genearte access and refresh token
    //  call mongodb to check the db if there is any user with the same username ( email in case ) is present or not , if not throw err . And redirect to register 
    //  if username/email present. Then get its _id and store it in variable 
    //  retreive username and pass from that variable to check if both are same or not. If no then err
    //  send cookie 
    //  if yes then redirect it to the page we want 

    const { username, email, password } = req.body

    if (!username && !email) {//(!(username || email))
        throw new ApiError(400, "username or password is invalid!")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })//finding on the basis of email || username

    if (!user) {
        throw new ApiError(401, "User does not exist")
    }

    const isPasswordValid = await user.ispasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {// cookies
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"))

})

const logoutUser = asyncHandler(async (req, res) => {
    // clear cookies
    // remove refreshToken
    // from auth
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 } //this removes the field from the document
        },
        {
            new: true
        }
    )

    const options = {// cookies
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))

});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // access through cookies
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorised request")
    }
    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new Api("401", "Invalid! refresh token ")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError("401", "Refresh token is expired or used")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        const options = {// cookies
            httpOnly: true,
            secure: true
        }

        return res.staus(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(201, { accessToken, newRefreshToken }, "Access token rfreshed successfully")
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Inavalid refresh token")
    }


})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    // if(!(conformPassowrd === newPaaword)){
    //     throw new ApiError(401,"Incorrect Password")
    // }

    const user = await User.findById(req.user?._id) // req.user is getting from auth that means user is logged in
    const isPasswordCoreect = await user.ispasswordCorrect(oldPassword)

    if (!isPasswordCoreect) {
        throw new ApiError(400, "Inavlid Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false });// cause we dont want to check other validations

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changes successfully"))


})

const getCurrentUser = asyncHandler(async (req, res) => // req.user from auth 
{
    return res.status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"))

})

const updateAccountDeatails = asyncHandler(async (req, res) => {
    const { fullname, username, email } = req.body

    if (!(username || email)) {
        throw new ApiError(401, "Something wnet wrong")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullname: fullname,
            email: email,
            username: username
        }
    }, { new: true }).select("-password")

    return res.status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updatedUserAvatar = asyncHandler(async (req, res) => {
    const { avatarLocalPath } = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(404, "Avatar file is missing")
    }

    //todo delete old image - assignment


    const avatar = await UploadOnClodinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(404, "Cannot upload to Cloadinary")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            avatar: avatar.url
        }
    }, { new: true }).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Images has been updated successfully"))


})

const updateUserCoverImage = (asyncHandler(async (req, res) => {
    const newCoverImage = req.file?.path

    if (!newCoverImage) {
        throw new ApiError(404, "Error has been encountered during getting the coverImage")
    }

    const coverImage = await User.uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }


    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: newCoverImage.url
            }
        }, { new: true }).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "CoverImage has been updated successfully"))
}))

const getUserChannelProfile = asyncHandler(async (req, res) => {

    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    // const user = User.find({username})

    const channel = await User.aggregate(
        [
            {
                $match: {
                    username: username?.toLowerCase()
                }
            }, {
                $lookup: {
                    from: "subscriptions", //subscription model
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            }, {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscribed"
                }
            }, {
                $addFields: {
                    subscribersCount: {
                        $size: "$subscribers"
                    },
                    channelsSubscribedToCount: {
                        $size: "$subscribed"
                    },
                    isSubscribed: {
                        $cond: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                }
            }, {
                $project: {
                    fullname: 1,
                    username: 1,
                    subscribersCount: 1,
                    channelsSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    email: 1
                }
            }
        ]
    )

    //from subscription model

    if (!channel?.length) {
        throw new ApiError(401, "Channel does not exists")
    }

    return res.status(200).json(new ApiResponse(200, channel[0], "User channel fetched successfully "))

})


const getWatchHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDeatails,
    updatedUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}
/*
    res.status(200).json({
        message: "ok"
    })
        JCMN%$2157

    access token short lived

*/
// the mongodb compass will not show the api response becuase we are not saving the users we are just giving the api responses

/*
Videosm -> owner -> users
*/

/*
likes
id           string pk
comment      objectId comments
createdAt    Date
video        objectId videos
updatedAt    Date
likedBy      objectId users
tweet        objectId tweets

tweet
id          string pk
owner       objectId users
content     string
createdAt   Date
updatedAt   Date

*/