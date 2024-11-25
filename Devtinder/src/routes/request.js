const express = require('express');
const { isUserAuth } = require('../middleware/auth');

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", isUserAuth, async (req, res) => {
    const user = req.body;

    console.log("Sending a connection request");

    res.send(user.firstName + " send the cnnection request .");

});

module.exports = requestRouter;