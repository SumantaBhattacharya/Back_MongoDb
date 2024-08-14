//jwt part2

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express()
const path = require('path')
const userModel = require("./models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const saltRounds = 10;



app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.use(cookieParser())

app.get("/",(req,res)=>{

    res.render("index.ejs")
})

app.post("/create",(req,res)=>{
    let {username,email,password,age} = req.body;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt,  async(err,hash)=> {
            // Store hash in your password DB.
            let createdUser = await userModel.create({
                name: username,
                email: email,
                password: hash,
                age: age
            })

            let token = jwt.sign({email:email},"secret");//email:"sumanta2004@gmail.com"
            res.cookie("token",token)

            res.send(createdUser)
            // res.redirect("/")
            
        }); 
    });
});

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/login",async(req,res)=>{
    let user = await userModel.findOne({email: req.body.email})
    console.log(`You have successfully logged in ${user}`);
    if(!user){
        return res.send("Something went wrong")
    }else{
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if (result){
                let token = jwt.sign({email:user.email},"secret");//email:"sumanta2004@gmail.com"
                res.cookie("token",token)
                res.send("yes,you can login")
            }
            else res.send("yes,something is wrong")
        })
    }// user.passwork is hased password req.body.password is the original passowrd
})

app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/")
})

let port =3000;

app.listen(3000,()=>{
    console.log(`Server running at http://localhost:${port}`);
})

/*

using import in user.schema.js and require in index.js will cause problems.

Reasons:
Module System Mismatch:

import is part of ES6 modules, while require is part of CommonJS modules. These are different systems for loading modules, and they are not directly compatible.

JWT JSON WEB TOKEN
*/