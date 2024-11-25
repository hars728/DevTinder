const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "email",
        "phoneNo",
        "gender",
        "photo",
        "about",
        "address",
        "skills"
    ];
    const isEditAllowe = Object.keys(req.body).every((field) => allowedEditFields.includes(field)
    );

    return isEditAllowe;
}
module.exports = {
    validateSignupData,
    validateEditProfileData
};