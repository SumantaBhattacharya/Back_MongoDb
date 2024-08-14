// mondb part-2
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.models');
var methodOverride = require('method-override')

const app = express();
const port = 8080;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log('Connection to MongoDB successful');
    } catch (err) {
        console.error(`An error occurred: ${err}`);
    }
}

main();

// Routes
app.get('/chats', async (req, res) => {
    let chats = await Chat.find()
    console.log(`All the chats of the users ${chats}`);
    res.render("index.ejs",{chats})
});

app.get("/chats/new", async (req, res) => {
    res.render("new.ejs")
});

app.post("/chats", async (req, res) => {
    let {from,msg,to}= req.body; // coming from new.ejs form
    let newChat1 = new Chat({
        from: from,
        msg: msg,
        to:to,
        created_at: new Date()
    })
    // res.send("working")
    newChat1.save().then((result)=>{
        console.log(`The data is saved successfully ${result}`);
    }).catch((err)=>{
        console.log(`An Error has been occured ${err}`);
    })
    res.redirect('/chats'); // Redirect to the chats list page
});//when we use then we dont need to use await

app.get("/chats/edit/:_id", async (req, res) => {
    const {_id} = req.params;// for every message we have created we gotten a id by default that is created by the MongoDB by click the message button the id wil be pass to the route then we will create that route we will fetch the route id that was passes by by using req.params then we will check the the if of individual meassage match the list of messages id or not if yes we will render the edit.ejs 
    let chat = await Chat.findById(_id)
    if (!chat) {
        return res.status(404).send('Chat not found');
    }
    res.render("edit.ejs",{chat})//inside chat we are passing id
});

app.put("/chats/:_id", async (req, res) => {
    const { _id } = req.params;
    const { msg } = req.body;// msg:newmsg
    let updatedChat = await Chat.findByIdAndUpdate(_id, { msg: msg }, { runValidators: true, new: true });
    res.redirect("/chats");
});

app.delete("/chats/delete/:_id", async (req, res) => {
    const { _id } = req.params;
    let deltedChat = await Chat.findByIdAndDelete(_id)
    res.redirect("/chats");
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*
    Creating the Model
    Chat will have:(_id,form,to,message,created_at)
    Initializa Database
    init.js

    Chats
    index Route
    GET /chats

    New and Create Route
    GET /chats/ne
    POST /chats

    GET /chats/:id/edit
    PUT /chats/:id

    
*/