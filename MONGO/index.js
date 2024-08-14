// mondb part-1

const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test');

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch(err => console.log(err));


const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }, quantity: {
    type: Number,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  title: {
    type: [String],
    maxlength: 20,
    min:["TITLE","Title is not given for the product"]
  },
  name: String,
  required: [true, "name cannot be skipped"],
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: false,
  },
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Other'],
    min: 'Non-binary',
  },
  orderItems: {
    type: [OrderItemSchema]
  },
  Specialisation: [{
    type: String,
    default: 0
  }]

}, { timestamps: true })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// module.exports = mongoose.model("User",userSchema);
// export const User = mongoose.model("User",userSchema);

const User = mongoose.model("User", userSchema);



User.insertMany([
  { name: "RobertDowney", email: "robert@gmail.com", age: 50 },
  { name: "Manu Singh", email: "manu@yahoo.com", age: 36 },
  { name: "Ayush Ujwal", email: "ayush2003@google.com", age: 12 }
]).then((results) => {
  console.log(`The data has been successfully inserted ${results}`);
})// when we using insertMany method we dont need save() method


const user1 = new User({
  name: "Anish Pandey",
  email: "anish2002@gamil.com",
  age: 21
})

// user1.save();

user1.save()
  .then((result) => {
    console.log(`Connection has been successfully craeted ${result}`);
  })
  .catch((err) => {
    console.log(`An Error has been Encountered ${err}`);
  });

// schema contains only work on insertion nor updation
User.findByIdAndUpdate("66af0bfbc2a28fd60ad9592c",{age:-1}, {runValidators:true})
.then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System ${err.errors.age.properties.message}`);
})


User.find({}).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.find({}).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results[0].name}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.find({ age: { $gt: 47 } }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.findOne({ _id: "66af0bfbc2a28fd60ad9592d" }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})// Camel case syntax

User.findById("66af0bfbc2a28fd60ad9592d").then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.updateOne({ name: "RobertDowney" }, { age: 39 }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})


User.updateMany({ age: { $eq: 20 } }, { age: 22 }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.findOneAndUpdate({ age: { $gte: 20 } }, { age: 22 }, { new: true })
  .then((results) => {
    console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
  }).catch((err) => {
    console.log(`An ERROR! has been found on your System`);
  })

User.findByIdAndUpdate('66af0bfbc2a28fd60ad9592a', { $set: { name: 'sonali bhattacharya' } }, { new: true })
  .then((results) => {
    console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
  }).catch((err) => {
    console.log(`An ERROR! has been found on your System`);
  })

User.deleteOne({ name: "Manu Singh" }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.deleteMany({ age: { $lt: 18 } }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.findByIdAndDelete('66af0bfbc2a28fd60ad9592c').then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})

User.findOneAndDelete({ name: "Manu Singh" }).then((results) => {
  console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
}).catch((err) => {
  console.log(`An ERROR! has been found on your System`);
})


User.findOneAndReplace({ name: "Manu Singh" }, { name: "Anita Bhattacharya", age: 47 })
  .then((results) => {
    console.log(`The list of Users Coming to Visit out Website everyday ${results}`);
  }).catch((err) => {
    console.log(`An ERROR! has been found on your System`);
  })



/*

 127.0.0.1 is localhost
 MongoDB-Port 27017
 mongoose.connect('mongodb://127.0.0.1:27017/test'); await for a promise from the database
 .connect is a asynchronous function
 https://mongoosejs.com/docs/index.html
 Schema defines the shape of the documents within that collection
 case sensitive
 Model in mongoose is a class with which we construct documents.
 export const User = mongoose.model("User",userSchema);
              model                 collection
                                    lowercase
                                    plural
 INSERT
 Inserting One
 const user1 = new User({name:"Adam",email:"adam@yahoo.in",age:48});
 const user2 = new User({name:"Eve",email:"eve@google.con",age:40});

 user1.save() //to save in DB
 user2.save() //to save in DB

 CRUD with fs
 CRUD with array
 CRUD with JSON
 CRUD with sql environment
 CRUD with sql + express
 CRUD with mongodb shell
 CRUD with MONGO DB  CRUD with MongoDB + express

 cd "C:\Users\SUDIP BHATTACHARYA\Desktop\Back_MongoDb\MONGO"

 node
 .load index.js
 user1
 .save is a asynchronous method which return promise
 by default, Mongoose adds an _id property to your schemas

 db.users.find()
 __v -Version

 Mongoose uses Operation Buffering
 Mongoose lets you start using your models immediately,
 without waiting for mongoose to establish a connection to MongoDB
 thats why these mathods are async

 .find() returns a query object(thennable) not promises
 Mongoose Queries are not promises. But they have a ,then()

 https://mongoosejs.com/docs/api/model.html

 .update() returns a query object(thennable) not promises
 .updateOne()
 .updateMany()
 .findOneAndUpdate()
 .findByIdAndUpdate()

 .updateOne(): Returns an update result object.
 .findOneAndUpdate() and .findByIdAndUpdate(): Return the document 
 print the document before update 

 User.findOneAndUpdate({}},{},{new:false}) -by default new's value is false

 DELETE
 model.deleteOne()
 model.deleteMany()
 findByIdAndDelete
 findOneAndDelete
 returns a query object 

 enum -enum is a array which creates a valideter which checks if the value is in the given array
 
 npm init -y
 npm i express ejs mongoose 
*/