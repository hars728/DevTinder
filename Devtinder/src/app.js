const express = require("express");
const { adminAuth, isUserAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());

// app.use("/admin", adminAuth);

// app.use("/admin/seedata", (req, res, next) => {
//     console.log("admin now verified");
//     res.send("data ware present");
//     next();

// })

// app.use("/users", isUserAuth, (req, res, next) => {
//     console.log("checking the auth second");
//     res.send("users using there own data");
// })


app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    try {
        await user.save();
        res.send("user created");
    } catch (error) {
        res.status(400).send(error.message);
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


