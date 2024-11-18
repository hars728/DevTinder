const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://LearningNodejs:WoHMFdQUkAND0wXl@learningnodejs.qjzaj.mongodb.net/devTinder");
}

module.exports =
    connectDB;


