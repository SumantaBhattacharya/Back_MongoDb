## From this onwards my jouney of learning MongoDB starts here
# Learning MongoDB


## Project Setup

1. **Initialize a Node.js Project**:
    ```bash
    npm init -y
    ```

2. **Install Required Packages**:
    ```bash
    npm install express
    ```

3. **Setup Express Application**:
    ```javascript
    const express = require('express');
    const app = express();

    app.use(express.json());

    app.listen(8000, () => {
        console.log('Server is running on port 3000');
    });
    ```
4. **Install Required Packages**:
    ```bash
    npm install express mongoose bcryptjs jsonwebtoken cloudinary multer 
    ```
3. **Setup Mongoose**:
    ```javascript
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/DB', {
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error("Connection error", err);
    });

    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
    ```
## Video Tutorial

I'm learning MongoDB from the following video:

[![MongoDB Tutorial](https://img.youtube.com/vi/9B4CvtzXRpc/0.jpg)](https://youtu.be/9B4CvtzXRpc?si=s1_FIcmX9vjuRpvA)

You can watch the video [here](https://youtu.be/9B4CvtzXRpc?si=s1_FIcmX9vjuRpvA).

## Key Points to Learn

- Introduction to MongoDB
- Setting up MongoDB


## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)

Now im on on the second video

Watched this totorial to learn from it 
[![Connect to MongoDB](https://img.youtube.com/vi/w4z8Py-UoNk/0.jpg)](https://youtu.be/w4z8Py-UoNk?si=D-EKuhBBcLKxNaSW)
```javascript
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
```

# Custom API Response and Error Handling

[![Custom API Response and Error Handling](https://img.youtube.com/vi/S5EpsMjel-M/0.jpg)](https://youtu.be/S5EpsMjel-M?si=-JwBsd0oV36t0N2V)

*This document is based on the YouTube video as well*: [Custom API Response and Error Handling](https://youtu.be/S5EpsMjel-M?si=-JwBsd0oV36t0N2V).

```javascript
class ApiError extends Error{
    constructor(statusCode,message= "Something went wrong",errors=[],stack=""){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false //not passing the success code cause we are handling api error handling but not api response
        this.errors = errors

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}
```

```javascript
class ApiResponse{
    constructor(statusCode,data,message = "Success"){
        this.ststusCode = statusCode
        this.data = data
        this.message = message,
        this.success = statusCode < 400 //Client error responses
    }
}

export {ApiResponse}
```

# User and Video Model with Hooks and JWT

[![User and Video Model with Hooks and JWT](https://img.youtube.com/vi/eWnZVUXMq8k/0.jpg)](https://youtu.be/eWnZVUXMq8k?si=A7JNgL-ZExtI2zXO)

This document is based on the YouTube video: [User and Video Model with Hooks and JWT](https://youtu.be/eWnZVUXMq8k?si=A7JNgL-ZExtI2zXO).

```javascript
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()// it every time modifies the password to prevent that we are using the upper line
})// arrow function dont get the this reference

userSchema.methods.ispasswordCorrect = async function (password) {//user.password
   return await bcrypt.compare(password, this.password)
}

```

# File Upload in Backend using Multer

## Video Reference
I'm studying this topic from the following video:
[![File Upload in Backend using Multer](https://img.youtube.com/vi/6KPXn2Ha0cM/0.jpg)](https://youtu.be/6KPXn2Ha0cM?si=hgRnSzkdVBtoOEPp)

This document is based on the YouTube video: [File Upload in Backend using Multer](https://youtu.be/6KPXn2Ha0cM?si=wD0QJAz1kv68T-cw).

```javascript
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })


```

## Topics Covered
- Installing and configuring Multer
- Handling single and multiple file uploads
- Validating file types and sizes
- Storing uploaded files on the server
- Error handling during file uploads

[![How to Deploy Node.js App on Render](https://img.youtube.com/vi/qgZiUvV41TI/0.jpg)](https://youtu.be/qgZiUvV41TI?si=1EOg6OECUuG_7ysu)


# Complete Guide for Router and Controller Debugging

[![Complete Guide for Router and Controller Debugging](https://img.youtube.com/vi/HqcGLJSORaA/0.jpg)](https://youtu.be/HqcGLJSORaA?si=V1dOIPftSPp8fgGK)


**Video Source:** [YouTube - Complete Guide for Router and Controller Debugging](https://youtu.be/HqcGLJSORaA?si=V1dOIPftSPp8fgGK)


#  Logic Building | Register Controller 

[![Register Controller Logic Building](https://img.youtube.com/vi/VKXnSwNm_lE/maxresdefault.jpg)](https://youtu.be/VKXnSwNm_lE?si=NLLpTBqiqeUV8hiY)

## Video Overview

This video covers the logic building for a register controller, including validation, file checking, and integrating with a database.

```javascript
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
            $set: { refreshToken: undefined }
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

```

## Key Points

- Logic building is achieved through real-world software projects
- Logic building exercise helps in breaking down problems into small steps
- Validation and file checking are important steps in register controller
- Extract URL from the response and check for successful avatar upload
- The user details are extracted from the request body with a destructure operation
- Testing the data using Postman
- To use the uploaded file in the register route, add the upload middleware and use the 'fields' option to accept multiple files
- Creating an array with two objects for accepting avatar and cover image files
- Logic building for register controller
- get user details from frontend
- validation - not empty
- check if user already exists: username, email
- check for images, check for avatar
- Ensure validation of cover image and handle cases when it is missing
- upload them to cloudinary, avatar
- Creating an entry in the database with Avatar object
- create user object - create entry in db
- Use Find by ID to find a user and ensure successful creation
- remove password and refresh token field from response
- check for user creation
- Creating a properly structured API response
- return res
- Register controller and bug fixes

# How to Use Postman for Backend

Learning how to effectively use Postman for backend development in this tutorial.

[![How to Use Postman for Backend](https://img.youtube.com/vi/_u-WgSN5ymU/0.jpg)](https://youtu.be/_u-WgSN5ymU?si=Ng0le-DgzCHF0SNm)

# Access Refresh Token, Middleware and Cookies in Backend

Explore how to handle access tokens, middleware, and cookies in backend development in this comprehensive tutorial.

[![Access Refresh Token, Middleware and Cookies in Backend](https://img.youtube.com/vi/7DVpag3cO0g/0.jpg)](https://youtu.be/7DVpag3cO0g?si=F57VD56K3A4lLUpf)


Todo's for login 

- take input from the user from the login page.
- save it in a variable
- apply check ( as per js series form handling part ) if the username == username && password == password . Then perform some action.
- call mongodb to check the db if there is any user with the same username ( email in case ) is present or not , if not throw err . And redirect to register 
-  if username/email present. Then get its _id and store it in variable 
- retreive username and pass from that variable to check if both are same or not. If no then err
- if yes then redirect it to the page we want

# Learning Access Token and Refresh Token in Backend

[![Learning Access Token and Refresh Token in Backend](https://img.youtube.com/vi/L2_gIrDxCes/0.jpg)](https://youtu.be/L2_gIrDxCes?si=AxEUvc9Xxfk-53qV)

In this video, you'll learn about Access Tokens and Refresh Tokens, including how they are used in backend development.

```javascript

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

```
```javascript
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
```

---

### Key Points:
- **Understanding Access Tokens**: Access tokens are the key a user generates post-login. They are generally of shorter duration and are used for authenticating user actions within a session.
- **Implementing Refresh Tokens**: When the session is complete, the user has two options:
  1. Enter the password again.
  2. Hit an API endpoint to refresh the token.

  The second option is more useful since it is a long-duration key. Refresh tokens can be used to extend the session without the user having to enter the password manually.

  - **Token Handling Strategy**:
  - **Generate New Access Token Only**: When refreshing, generate only a new access token. The refresh token remains valid as it is already long-lived.
  - **Send Tokens in Cookies**: Send the new access token and the existing refresh token back to the frontend in cookies.
  - **Regenerate Both Tokens (If Needed)**: If you decide to regenerate both tokens, make sure to save the new refresh token in the database. Otherwise, keeping a long-lived refresh token becomes pointless.

- **Security Considerations**: Best practices for handling tokens securely in your backend.

---

# Writing Update Controllers for User | Backend with JS

I'm currently learning about **"Writing Update Controllers for User | Backend with JS"** from this YouTube video:

[![Writing Update Controllers for User | Backend with JS](https://img.youtube.com/vi/9azRerL6CZc/0.jpg)](https://youtu.be/9azRerL6CZc?si=kG7E4JNwlhqSf64J)

```javascript
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
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const updatedUserAvatar = asyncHandler(async(req,res)=>{
    const {avatarLocalPath} = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(404,"Avatar file is missing")
    }

    

    const avatar = await UploadOnClodinary(avatarLocalPath)

    if(!avatar){
        throw new ApiError(404,"Cannot upload to Cloadinary")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,{$set:{
        avatar: avatar.url
    }},{new:true}).select("-password")

    return res.status(200).json(new ApiResponse(200,user,"Images has been updated successfully"))

    
})

const updateUserCoverImage = (asyncHandler(async(req,res)=>{
    const newCoverImage = req.file?.path

    if (!newCoverImage) {
        throw new ApiError(404,"Error has been encountered during getting the coverImage")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {$set:{
            coverImage: newCoverImage.url}
        },{new:true}).select("-password")

        return res.status(200).json(new ApiResponse(200,user,"CoverImage has been updated successfully"))
}))

```

# Understand the Subscription Schema

I'm currently learning about the topic **"Understand the Subscription Schema"** from this YouTube video:

[![Understand the Subscription Schema](https://img.youtube.com/vi/4_Ge2QEcT8k/0.jpg)](https://youtu.be/4_Ge2QEcT8k?si=ewaMrk8KOjNSXf7p)

```javascript
import mongoose, { Schema }  from "mongoose";

// const subscribtionsSchema = new mongoose.Schema("")

const subscriptionsSchema =  new Schema({
    subscriber:{
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
        ref: "User"
    }        

},{timestamps:true})

export const Subscription = mongoose.model("Subscription", subscriptionsSchema)

```

In this video, the instructor explains the key concepts and practical implementation of a subscription schema

# Learning MongoDB Aggregation and Operations

I'm currently learning various MongoDB concepts from this YouTube video:

[![Learning MongoDB](https://img.youtube.com/vi/vx1C8EyTa7Y/0.jpg)](https://youtu.be/vx1C8EyTa7Y?si=mswl5zChIzAMTJ9x)

## Resources

- **MongoDB Aggregation Pipeline Documentation**: [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

- **Gist with Aggregation Examples**: [Aggregation Examples](https://gist.github.com/hiteshchoudhary/a80d86b50a5d9c591198a23d79e1e467)
- **Sample Data JSON**: [Data JSON](https://gist.githubusercontent.com/hiteshchoudhary/a80d86b50a5d9c591198a23d79e1e467/raw/a9d8022cf95dee0de47efad29697fecea05f9a23/data.json)
- **Authors JSON**: [Authors JSON](https://gist.githubusercontent.com/hiteshchoudhary/a80d86b50a5d9c591198a23d79e1e467/raw/a9d8022cf95dee0de47efad29697fecea05f9a23/authors.json)
- **Books JSON**: [Books JSON](https://gist.githubusercontent.com/hiteshchoudhary/a80d86b50a5d9c591198a23d79e1e467/raw/a9d8022cf95dee0de47efad29697fecea05f9a23/books.json)
- **$group (aggregation)** :[$group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
- **$match (aggregation)** :[$match ](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
- **$project (aggregation)** :[$project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)
- **$push** :[$push](https://www.mongodb.com/docs/manual/reference/operator/update/push/)
- **$$all**[$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/)
## `$group` Operator in Aggregation Pipelines
The $group stage separates documents into groups according to a "group key". The output is one document for each unique group key.

For detailed information, visit the [MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/).

$push
Definition
The $push operator appends a specified value to an array.


### Key Topics Covered:
- **Creating a Collection in MongoDB Cluster and Inserting Data via MongoDB Extension in VS Code**
- **Using Aggregation Pipeline in MongoDB**
  - **Operators and Field Names**: Proper use of the `$` sign with operators and field names.
- **Counting with `$count` Operator and `$match`**
- **Summing with Grouping**: Avoiding the use of `$count` when summing with grouping.
- **Grouping by `_id` with a Specific Field**
- **Grouping All by `null`**
- **Calculating Average with `$avg`**
- **Filtering in the Second Stage Using `$sort`**
- **Nested Drilling, Sorting, and Limiting**
- **Summarizing Questions**

---

## Topics i been throgh leaning mongodb aggregations:
*aggregation pipelines | setup
Grouping in mongodb
ground sum and more
dealing with arrays in aggregation
match the project pipeline
lookup in mongodb*

# MongoDB Aggregation: Operators 

## Operators Covered

- `$match`
- `$count`
- `$set`
- `$group`
- `$avg`
- `$sum`
- `$sort`
- `$limit`
- `$push`
- `$unwind`
- `$project`
- `$all`
- `$lookup`
- `$addFields`
- `$regex`
- `$first`

## Examples and Steps

```json
// 1. How Many Users Are Active
[
  {
    $match: {
      isActive: true
    }
  }
]
ii.
[
  {
    $match: {
      isActive: true
    }
  },
  {
    $count: 'active users'
  }
]
```
```json
// 2. What Is the Average Age of All Users
[
  {
    $group: {
      _id: "$age"
    }
  }
]
ii.
[
  {
    $group: {
      _id: null
    }
  }
]
iii.
[
  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age"
      }
    }
  }
]
```
```json
// 3. List the Top 2 Most Common Favorite Fruits Among Users
[
  {
    $group: {
      _id: "$favoriteFruit"
    }
  }
]
ii.
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1
      }
    }
  }
]
iii.
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit: 2
  }
]
```
4. FIND THE TOTAL NUMBER OF MALES AND FEMALES.
```json
[
  {
    $group: {
      _id: "$gender",
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit: 2
  }
]
```

```json
//5. Which country has the highest number of registered users?

[
  {
    $group: {
      _id: "$company.location.country",
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit: 1
  }
]
```
```json
//6. List all unique eye colors present in the collection

[
  {
    $group: {
      _id: "$eyeColor",
      count: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  }
]
```

```json

// 7. What is the avearage number of tags per user?


// i.if the users has three elements in the array $unwind operator create 3 documents of that 3 elements in the array
// steps break the elements into documents group them based on their
// id so that multiple documents of the same id together and find the count of them then
// again group them in to a single documents and find the average

[
  {
    "$unwind": {
      "path": "$tags"
    }
  },
  {
    "$group": {
      "_id": "$_id",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$group": {
      "_id": null,
      "avg": {
        "$avg": "$count"
      }
    }
  }
]
```
```json
//Example 2: Using $addFields and $size
//i.
[
  {
    "$addFields": {
      "numberofTags": {
        "$size": "$tags"
      }
    }
  }
]
//  ii:
[
  {
    "$addFields": {
      "numberofTags": {
        "$size": {"$ifNull": ["$tags",[]]}
      }
    }
  },
  {
    "$group": {
      "_id": null,
      "avg": {
        "$avg": "$numberofTags"
      }
    }
  }
]
```
```json

//7.How many users have 'enim' as one of their tags?

// i.
[
  {
    $match: {
      tags: "enim"
    }
  }
]
// ii.
[
  {
    $match: {
      tags: "enim"
      
    }
  },{
    $count: 'userWithEnimTag'
  }
]
```
```json
//8. What are the names and age of users who are inactive and have 'valit as a tag

[
  {
    $match: {
      isActive: false,
      tags: "velit"
    }
  },{
    $project: {
      name: 1,
      age: 1,

    }
  }
  
]
```
```json
//9.How manu users have a phone number starting with '+1(941)'?
[
  {
    "$match": {
      "phone": {
        "$regex": /^\+1\(940\)/
      }
    }
  },
  {
    "$count": "string"
  }
]
```

```json
// 10. who has registered most recently
[
  {
    $sort: {
      sort: -1
    }
  },
  {
    $limit: 4
  },
  {
    $project: {
      name: 1,
      registered: 1,
      favoriteFruit: 1
    }
  }
]

```

```json
// 11. categorise users by their favrite fruit 

i.
[
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1
      }
    }
  }
]
```
```json
ii.
[
  {
    $group: {
      _id: "$favoriteFruit",
      users:{
        $push:"$name"
      },
      count: {
        $sum: 1
      }
    }
  }
]

```

```json
// 12. How many users have 'ad' as their second tag in their list of tags?
[
  {
    "$match": {
      "tags": "ad"
    }
  }
  
]
ii.
[
  {
    "$match": {
      "tags": "ad"
    }
  },
  {
    $count: 'string'
  }
  
]

iii.
[
  {
    "$match": {
      "tags.1": "ad"
    }
  },
  {
    $count: 'string'
  }
  
]
```
```json
// 13. Find users who have both 'enim' and 'id' as their tags.

  [
    {
      $match: {
        tags: { $all: ['enim', 'id'] }
      }
    }
  ]
```
```json
//14. List all the companies located in the usa with their corresponding user count

//i.
[
  {
    $match: {
      "company.location.country": "USA",
      
    }
  },{
    $group: {
      "_id": "null",
      "count": {
        "$sum": 1
      }
    }
  },
]
```
```json
//ii.
[
  {
    $match: {
      "company.location.country": "USA",
      
    }
  },{
    $group: {
      _id: "company.title",
      count: {
        $sum: 1
      }
    }
  },
]
```
or
```json
[
  {
    "$match": {
      "company.location.country": { "$regex": "^usa$", "$options": "i" }
    }
  },
  {
    "$group": {
      "_id": "$company.title",
      "userCount": { "$sum": 1 }
    }
  }
]
```
```json
// 13.

// i.

[
  {
    $lookup: {
      from: "authors",
      localField: "authod_id",
      foreignField: "_id",
      as: "author_details"
    }
  }
]

// ii.

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  }
],{
  $addFields: {
    author_details: {
      $first: "$author_details"
    }
  }
}

// iii. 

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id", 
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0]
      }
    }
  }
]
```
Notes
$ represents a keyword in MongoDB's aggregation framework.
$sum: 1 means that every time a user fits into a specific category, 1 is added to the count for that category.
Without grouping, you cannot perform operations on all documents in the database.
$avg is an accumulator operator that calculates the average value of a specified field.
$sum is also an accumulator operator, used to add values together.
$push is also considered as a accumulatar
$all is a operator which works by providing an array
$first it can go through any array and bring the first value out of it


### Some additional tips

1. Always think TWICE when you are using operators like "$unwind' because it is very costly operator because it creates multiple copies of a same documents. Try to think some other possible solution. Some costly operators are: "$lookup", "$unwind", "$facet", etc.
2. It is a best practice to use $project after the $group stage in the pipeline because "by default, mongodb return a BSON object and not a JSON object" and BSON object have more properties than a JSON object. So using the $project, you can get the JSON object You can study this point for more knowledge.
3. If the size of your document is big, then always use ".allowDiscUse(true)" in your aggregation pipeline.
4. When dealing with larger chunks of data, use "cursor" and "batchSize" approach. 

## Learning MongoDB Aggregation Pipelines

[![Learn MongoDB Aggregation Pipelines](https://img.youtube.com/vi/fDTf1mk-jQg/0.jpg)](https://youtu.be/fDTf1mk-jQg?si=fLbImBwj_8jHcoBp)

## Overview

This video tutorial covers the essential concepts and practical applications of MongoDB aggregation pipelines. You'll learn how to:

- Perform data transformations using various stages of the aggregation pipeline.
- Use operators like `$lookup`, `$addFields`,

- **$lookup:** Performs a left outer join to another collection in the same database.
- **$addFields:** Adds new fields to documents.

# How to Write Sub Pipelines and Routes

[![How to Write Sub Pipelines and Routes](https://img.youtube.com/vi/qNnR7cuVliI/0.jpg)](https://youtu.be/qNnR7cuVliI?si=sduuWeA_-eHue1Hy)

## Overview

This video tutorial provides a comprehensive guide on writing sub-pipelines and routes in your application. It covers the following topics:

- **Sub-Pipelines:** How to create and manage sub-pipelines within larger data processing workflows.

# Summary of Our Backend Series

[![Summary of Our Backend Series](https://img.youtube.com/vi/VUgl3i8DdW4/0.jpg)](https://youtu.be/VUgl3i8DdW4?si=QsbIWdPVXnS_JTzX)

## Overview

This video serves as a recap of the entire backend development series, providing a high-level summary of the key topics covered. It’s perfect for those who want a quick review.

## Series Highlights

- **Introduction to Backend Development:** Overview of the fundamental concepts and tools used in backend development, including setting up a development environment.
  
- **Database Integration:** Detailed discussions on connecting to databases like MongoDB, setting up models, and performing CRUD operations.
  
- **API Development:** Step-by-step guides on creating RESTful APIs, handling HTTP requests, and managing routes effectively.

- **Authentication & Security:** Implementation of user authentication, session management, and security best practices.
  
- **Performance Optimization:** Techniques for optimizing backend performance, including caching strategies, and query optimization.

- **Error Handling & Testing:** Best practices for error handling, logging, and writing unit and integration tests to ensure code reliability.

# Backend Series Final Video

[![Backend Series Final Video](https://img.youtube.com/vi/Uc3Iq41npyI/0.jpg)](https://youtu.be/Uc3Iq41npyI?si=qzwUwJq2bqsOAnsF)

## Overview

This video marks the conclusion of the backend development series, providing a final wrap-up and reflecting on the journey through backend development.

# MongoDB Models for Playlist and Tweet

[![MongoDB Models](https://img.youtube.com/vi/-5yWyE4AiVk/0.jpg)](https://youtu.be/-5yWyE4AiVk?si=kFZSjeP1htL6hmlv)

In this video, I will learn about MongoDB models for implementing playlist and tweet functionalities.


* *File Struncture*

*As you might see i usually write a lot of comments in my code files which might make it look confusing to analise the code view but i prefer this way of wring cause it makes easier for me to understand the code while reading incase i forgot*

*so yeah, actually i make my notes on the go*


Thank you for reading!!
