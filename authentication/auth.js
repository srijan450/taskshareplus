const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const userModel = require("../models/userModel");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, "123456789");
        const user = await userModel.findOne({ _id: decode._id, "tokens.token": token });
        if (!user)
            throw new Error("please authenticate");
        req.user = user;
        req.token = token;
        next();
    }
    catch (e) {
        res.status(404).json({ error: "please sign in to access this page" });
    }
}

module.exports = authenticate;