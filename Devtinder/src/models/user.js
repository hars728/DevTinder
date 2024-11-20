const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }
    , lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('Invalid gender');
            }
        },
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    about: {
        type: String,
        default: "this is about you",
    },
    address: {
        type: String,
        default: "this is your address",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;