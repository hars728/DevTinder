const express = require('express');
const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        //validate the user which are coming
        validateSignupData(req);
        // Encrypt the password
        const { firstName, lastName, email, password, phoneNO, gender, address, age, skills, photo, about } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User(
            {
                firstName,
                lastName,
                email,
                password: passwordHash,
                phoneNO, gender, address, age, skills, photo, about
            }
        );

        await user.save();
        res.send("user created");
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (ispasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "Harsh@123", { expiresIn: "1h" });
            res.cookie("token", token);
            res.send("login success");
            console.log(token);
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }

});

authRouter.post("/logout", (req, res) => {
    // res.clearCookie("token");
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("logout succesfully");
});


module.exports = authRouter;