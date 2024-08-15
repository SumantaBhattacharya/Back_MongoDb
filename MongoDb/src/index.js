/* 
// import connectDB from './path/to/connectDB';
// import { DB_NAME } from "./constants";

// function connectDB(params) {
// }
*/

// require('dotenv').config({path:`./env`})

import dotenv from "dotenv"

import connectDB from './db/index.js';
// var express = require('express')

import { app } from "./app.js";

dotenv.config({
    path: `./.env`
})
// `./.env`

connectDB()
    .then(() => {

        app.on("err", (err) => {
            console.log(err);
            throw err;
        })

        const port = process.env.PORT || 8000;

        app.listen(port, () => { // middleware
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("MONGO DB ERROR!", err);
    })


/*
if changes made to env file then we need to restart the nodemon

As early as possible in your application,import and configure dotenv

The app.on method is used to set up event listeners for various events emitted by the Express application. In this case, it's listening for the "error" event.

middlewere are used using app.use

[req.get("/instagram")]--->middleweres[check if the user is logged in][check if the user is admim]--->(err,req,res,next)[res.send("hitesh")]

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

    Errors i have fased
    Since your package.json file specifies "type": "module", Node.js expects all module code to use ES module 
    syntax (import and export) rather than CommonJS (require and module.exports).

    The links i have been through
    https://www.npmjs.com/package/dotenv
    https://www.npmjs.com/package/cookie-parser
    https://www.npmjs.com/package/cors
    https://www.npmjs.com/package/mongoose-aggregate-paginate-v2
    https://www.npmjs.com/package/bcrypt

    https://expressjs.com/en/4x/api.html#req.cookies
    https://console.cloudinary.com/pm/c-a39a89478eb7b594b4b76bf80896ec/getting-started

    Npm installations 
    npm i cookie-parser
    npm i cors
    npm i mongoose-aggregate-paginate-v2
    npm i bcrypt
    npm i jsonwebtoken
    npm i cloudinary
    npm i multer
*/
