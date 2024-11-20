const express = require("express");
const { adminAuth, isUserAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());



app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    try {
        await user.save();
        res.send("user created");
    } catch (error) {
        res.status(400).send(error.message);
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


