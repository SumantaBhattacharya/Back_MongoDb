const express = require('express')
const userModels = require("./models/user.models");
const postModels = require("./models/post.models")
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var methodOverride = require('method-override')
const path = require('path')
const upload = require("./utils/multerconfig")
// const multer = require("multer");
// const crypto = require("crypto")

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(methodOverride('_method'))



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//         const filen = crypto.randomBytes(12, function name(err, bytes) {
//             const fn = bytes.toString("hex") + path.extname(file.originalname);//const path = require('path')

//             cb(null, fn)
//         })

//     }
// })
//textarea(req) file(files) DiskStorage - Server MemoryStorage - DB

// const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/register", async (req, res) => {
    let { username, name, age, email, password } = req.body;
    let user = await userModels.findOne({ email })
    if (user) {
        return res.status(500).send("User already registered")
    }

    bcrypt.genSalt(10, function (err, salt) {// req.body.password
        if (err) {
            return res.status(500).send("Error generating salt");
        }
        bcrypt.hash(password, salt, async function (err, hash) {

            if (err) {
                return res.status(500).send("Error hashing password");
            }

            let newUser = await userModels.create({
                username: username,
                name: name,
                age: age,
                email: email,
                password: hash
                // Store hash in your password DB.
            })
            // res.status(201).send("User registered successfully");
            let token = jwt.sign({ email: email, userid: newUser._id }, 'shhhhh');
            res.cookie("token", token);

            res.send("registered")



        });
    });
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    let user = await userModels.findOne({ email })
    if (!user) {
        return res.status(400).send("Invalid email or password");
    }
    // if there is user               req.body.password user has been founded on 61no line i.e the hash password stored in DB
    let isMatch = bcrypt.compare(password, user.password, function (err, isMatch) {

        if (err) {
            console.log("An error occurred while comparing passwords.");
        }

        if (!isMatch) {
            return res.status(400).render("login.ejs", { message: "Invalid email or password" });
        } else {
            let token = jwt.sign({ email: user.email, userid: user._id }, 'shhhhh');
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }

    });

});

app.get("/logout", (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.redirect("/login");
});

app.get("/profile", isloggedIn, async (req, res) => {
    try {

        // Extract the user ID from the decoded JWT token
        const userId = req.user.userid;//In the context of the isloggedIn middleware function, req.user is used to store the decoded JWT token information

        // Find the user by ID
        const user = await userModels.findById(userId);
        // const user = await userModels.findOne({email:req.user.email})).populate("post")

        if (!user) {
            return res.status(404).send("User not found");
        }

        await user.populate("post")//.populate() is a synchronous task | populate("post") tells Mongoose to fetch the complete Post documents that correspond to the ObjectIDs in the post field of the user document.
        // Render the profile page with user data
        res.render("profile.ejs", { user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Server error");
    }
});

app.post("/post", isloggedIn, async (req, res) => {
    let user = await userModels.findOne({ email: req.user.email });
    let { content } = req.body
    if (!user) {
        return res.status(404).send("User not found");
    }
    let post = await postModels.create({//user ,date, content ,likes
        user: user._id,
        content: content
    });
    // user is founded user and the post is difined isndie
    // the user model post and we are pust inside the post array
    // in user model as we have founded the user from the user model we are passing that postid
    //(A post is created and someid also created by default by thew mongodb) 
    //to the post array
    user.post.push(post._id);
    await user.save()// we are saving the user details in the db for more see below comments
    res.redirect("/profile")
})

app.get("/like/:_id", isloggedIn, async (req, res) => {

    let post = await postModels.findById({ _id: req.params._id }).populate("user")//user: {type: mongoose.Schema.Types.ObjectId,ref: "User"}
    // const userId = req.user.userid;
    // const likeIndex = post.likes.indexOf(userId);
    if (post.likes.indexOf(req.user.userid) === -1) {// if no likes is done then only like 
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid, 1));//only one like by one id
    }

    // we found out the post from there we are accessing the likes array inside postSchema we are pusing inside the req.user is the jwt The req.user object typically includes information such as the user's email and userid. and finally req.user.userid: This is the userid extracted from the decoded JWT and stored in req.user.
    // by user in the line 137 we are getting the userid(documents due to pupulation from there we are getting the userid from jwt)
    await post.save();
    res.redirect("/profile");
})//The userid is coming from the JWT (JSON Web Token) that you set when the user logs in. 

app.get("/edit/:_id", async (req, res) => {

    let post = await postModels.findById(req.params._id); // Find post by _id
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit", { post }); // Pass the post object to the EJS template

});

app.post("/edit-post/:_id", async (req, res) => {
    try {
        // Find the post by _id and update its content
        let post = await postModels.findOneAndUpdate(
            { _id: req.params._id },
            { content: req.body.content },
            { new: true } // Return the updated document
        );

        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Redirect to profile or another page
        res.redirect("/profile");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Define your routes here
app.delete("/delete/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        let deletedPost = await postModels.findByIdAndDelete(_id);
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        res.redirect("/profile");
    } catch (err) {
        res.status(500).send('Error deleting post');
    }
});


app.get("/profile/upload", (req, res) => {
    res.render("test.ejs")
})

app.post("/upload", isloggedIn, upload.single("file"), async(req, res) => {
    //console.log(req.file);
    //req - body(textfield),file Disk Storage - Server | Memory Storage -DB
    let user = await userModels.findOne({email: req.user.email})
    user.profilepic= req.file.filename
    await user.save()
    res.redirect("/profile")
})

//  implement the isloggedIn middleware
function isloggedIn(req, res, next) {
    if (req.cookies.token === "") {//(!token)
        return res.status(401).send("You must be logged in");
    } else {
        let decoded = jwt.verify(req.cookies.token, "shhhhh")
        req.user = decoded;
        next();
    }

}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The app is listening on port http://localhost:${3000}`);
})

/* Clearing the Cookie: 
By setting the expires property to a past date (e.g., new Date(0)),
you ensure that the cookie is properly removed from the client’s browser.

const jwt = require('jsonwebtoken');

easy way
function isloggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("You must be logged in");
    }

    jwt.verify(token, 'shhhhh', (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }
        
        // If token is valid, attach the decoded info to the request object
        req.user = decoded;
        next();
    });
}

module.exports = isloggedIn;

When you create a new post and push the post's ID
into the post array of the user instance, you are modifying the user's document in memory.
However, these changes are not automatically saved to the database. 
You need to explicitly save the modified user document to persist these changes. 

What is populate?
In Mongoose, populate is a method used to replace the ObjectIDs in an array or a single field with the actual documents that those IDs refer to.

In your User schema, you have a field post which is an array of ObjectIDs referencing Post documents:

javascript
Copy code
const userSchema = new mongoose.Schema({
    // other fields...
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, { timestamps: true });
When you fetch a user document, the post field will contain an array of ObjectIDs, not the full Post documents. To get the actual data of the Post documents instead of just their IDs, you use the populate method.

Detailed Explanation
Fetching the User Document:

const user = await userModels.findById(userId);
This retrieves a user document from the database. 
The post field will contain ObjectIDs of the posts but not the full post documents.

Populating the posts Field:

await user.populate("post");
Here, populate("post") replaces the ObjectIDs in the post array with the actual Post documents.

populate("post")
tells Mongoose to fetch the complete Post documents that correspond to the ObjectIDs in the post field of the user document.

In the line `post.likes.push(req.user.userid);`, here's a breakdown of what's happening:

1. **`post.likes`**: This is an array of `ObjectId`s within the `Post` schema, where each `ObjectId` references a user who has liked the post. 

2. **`req.user`**: This is an object that contains the decoded JWT (JSON Web Token) payload. It was assigned in the `isloggedIn` middleware when the token was verified. The `req.user` object typically includes information such as the user's `email` and `userid`.

3. **`req.user.userid`**: This is the `userid` extracted from the decoded JWT and stored in `req.user`. It represents the unique identifier (`ObjectId`) of the user who is currently logged in and making the request.

So, when you do `post.likes.push(req.user.userid);`, you are adding the `userid` of the currently logged-in user to the `likes` array of the `post` document. This effectively records that the user has liked this particular post.
*/