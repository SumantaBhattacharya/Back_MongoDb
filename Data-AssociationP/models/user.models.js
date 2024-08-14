const mongoose = require('mongoose');
// const userModels = require('../../YTBACK/models/user.models');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/miniproject');
        console.log('Connection to MongoDB successful');
    } catch (err) {
        console.error(`An error occurred: ${err}`);
    }
}

main();

const userModels = new mongoose.Schema({
    username:{
        type: String
    },
    name: String,
    age: Number,
    email: String,
    password: String,
    profilepic: {
        type:String,
        default: "images/uploads/image.png"
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
},{timestamps:true})

const User = mongoose.model("User",userModels)
module.exports = User;