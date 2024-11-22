const express = require("express");
const { adminAuth, isUserAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());



app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (ispasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "Harsh@123");
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


app.get("/profile", isUserAuth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.find({ email: userEmail });
        if (user.length === 0) {
            res.status(404).send("user not found");
        } else {
            res.send(user);
        }

    } catch (err) {
        res.status(400).send("something went wronge");
    }
});
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const userfordelete = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userfordelete);
        res.send("user deleted succesfully");
    } catch (err) {
        res.status(400).send("something went wronge");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const users = req.params?.userId;
    const data = req.body;
    console.log(users);
    try {
        const allowed_updates = [
            "age",
            "phoneNo",
            "gender",
            "photo",
            "about",
            "address",
            "skills",
            "password",
        ];
        const updates = Object.keys(data).every((k) => allowed_updates.includes(k));
        if (!updates) {
            throw new Error("invalid data");
        }
        const user = await User.findByIdAndUpdate(users, data, {

            returnDocument: "after",
            runValidators: "true",
        });
        console.log(user);

        res.send("user update successfully");
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});


connectDB()
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch(err => console.error("not connect"));


