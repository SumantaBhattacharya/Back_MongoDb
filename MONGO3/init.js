const mongoose = require('mongoose');
const Chat = require('./models/chat.models');
const { faker } = require('@faker-js/faker');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("Connection to MongoDB successful");

        // Generate and save initial chat
        let chat1 = new Chat({
            from: "neha",
            to: "priya",
            msg: "send me your sheets",
            createdAt: new Date()
        });

        await chat1.save();
        console.log(`Initial chat saved: ${chat1}`);

        // Generate and insert random chats
        const randomChats = generateRandomChats(5);
        await Chat.insertMany(randomChats);
        console.log(`Random chats saved: ${randomChats.length}`);
    } catch (err) {
        console.error(`An error occurred: ${err}`);
    } finally {
        mongoose.connection.close();
    }
}

function generateRandomChats(numberOfChats) {
    const chats = [];

    for (let i = 0; i < numberOfChats; i++) {
        const chat = {
            from: faker.person.firstName(),
            to: faker.person.firstName(),
            msg: faker.lorem.sentence().slice(0, 50), // Ensure message is not longer than 50 characters
            createdAt: faker.date.recent()
        };

        chats.push(chat);
    }

    return chats;
}

main();

/*
After making these changes, run your init.js script again:
node init.js
And then start your Express server:
node index.js 
*/
