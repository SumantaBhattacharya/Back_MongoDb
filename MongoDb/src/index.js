/* 
// import connectDB from './path/to/connectDB';
// import { DB_NAME } from "./constants";

// function connectDB(params) {
// }
*/ 

// require('dotenv').config({path:`./env`})

import dotenv from "dotenv"

import express from 'express';
import connectDB from './db/index.js'; 


dotenv.config({
    path:`./env`
})

const app = express();
connectDB(); // Connect to MongoDB

const port = process.env.PORT || 8000;

app.listen(port, () => { // middleware
    console.log(`Server running at http://localhost:${port}`);
});

/*
if changes made to env file then we need to restart the nodemon

As early as possible in your application,import and configure dotenv

import express from "express"
const app = express()
import mongoose from 'mongoose';

    ;(async () => {
        try {
            await mongoose.connect("mongodb://127.0.0.1:27017/testDB"); // `${process.env.MONGODB_URL}/${DB_NAME`}
            app.on("err", (err) => {
                console.log(err);
                throw err;
            })

            const port = process.env.PORT || 8000;

            app.listen(port, () => { // middleware
                console.log(`Server running at http://localhost:${port}`);
            });

        } catch (err) {
            console.log(err);
        }
    })()

*/
