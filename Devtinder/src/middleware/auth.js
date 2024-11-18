const adminAuth = (req, res, next) => {
    console.log("checking the auth first");
    const token = "harsh";
    const isAdminAuth = token === "harsh";
    if (isAdminAuth) {
        next();
    }
    else {
        res.status(401).send("you are not admin");
    }
};

const isUserAuth = (req, res, next) => {
    console.log("checking the auth first");
    const token = "harsh";
    const isAdminAuth = token === "harsh";
    if (isAdminAuth) {
        next();
    }
    else {
        res.status(401).send("you are not admin");
    }
};
module.exports = {
    adminAuth,
    isUserAuth
};