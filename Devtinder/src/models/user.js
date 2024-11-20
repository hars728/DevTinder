const mongoose = require('mongoose');
const validator = require('validator');

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
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('enter strong password' + value);
            }
        }
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
        validator(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalide photo URL');
            }
        }
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