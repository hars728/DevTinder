const express = require("express");
const { isUserAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();


profileRouter.get("/profile/view", isUserAuth, async (req, res) => {
    try {

        const user = req.user;
        res.send(user);

    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
});

profileRouter.patch("/profile/edit", isUserAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            return res.status(400).send("Invalid data");
        }
        const loggedInUser = req.user;

        console.log(loggedInUser);

        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));

        console.log(loggedInUser);

        await loggedInUser.save();
        res.json({
            message: ` ${loggedInUser.firstName}  Profile updated successfully`,
            user: loggedInUser
        });
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }

});

module.exports = profileRouter;