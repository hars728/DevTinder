const express = require("express");
const { isUserAuth } = require("../middleware/auth");

const profileRouter = express.Router();


profileRouter.get("/profile", isUserAuth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

module.exports = profileRouter;