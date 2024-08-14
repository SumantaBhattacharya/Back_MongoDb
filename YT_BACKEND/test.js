// JWT PART1
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.cookie("name","sumanta");//send
    res.send("done")
})

app.get("/read",(req,res)=>{
    console.log(req.cookies);//read
    console.log(req.cookies.token);
    let data =jwt.verify(req.cookies.token, "secret")
    res.send(data)
})


app.get("/index",(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("JCNM8133", salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash);
            res.send(hash)
        });
    }); 
})


app.get("/decrypt",(req,res)=>{
    bcrypt.compare("JCNM8133", "$2b$10$8pduhi16O385CVpXiEHHBeF/6daQ.NiLtw5q8pnHmOgnPp0tC8nrK", function(err, result) {
        console.log(result);
        res.send(result)
    });
})

app.get("/JWT",(req,res)=>{
    let token = jwt.sign({email:"sumanta2004@gmail.com"},"secret")
    res.cookie("token", token)
    console.log(token);
    res.send(token)
})

const port = process.env.PORT || 3000;

app.listen(port, () => { // middleware
    console.log(`Server running at http://localhost:${port}`);
});

/* 
YT_BACKEND AND YTBACK IS FOR AUTHENTICATION AND AUTHORISATION 
npm i jsonwebtoken
// npm i bcrypt
// npm i express
// authentication and authorisation
// user ko profile dene se phale ye check kerna hota hai ki user hai kon -authentication

// authorised to perform to some tasks which are only can be executed by the admin
// permit/permission

// [server]<-[browser]
//         ->
        
// server har bar bul jata ha i ap kon ho ,
// ab kueki server blul jata ha ki ap kon ho to har bar wo har kam ke liya ap ke puchega ap kon ho

// cookies and session

// sabse phale kuch chize sikh ni hai
// cookie kaise set kerte hai
// bcrypt kaise use kerte hai for passward encryption and decryption
// jwt kya hai jwt me kaise data store kare and kaise bahar nikale

// http://localhost:3000

// authorisation header

// https://www.npmjs.com/package/bcrypt

JWT 
*/