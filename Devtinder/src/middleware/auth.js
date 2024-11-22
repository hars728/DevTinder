const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isUserAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Please login to access this resource" })
        }
        const decodeObj = await jwt.verify(token, "Harsh@123");
        const { _id } = decodeObj;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        res.send(400).send("Error :", error.message);

    }


};
module.exports = {

    isUserAuth
};