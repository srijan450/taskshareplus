const e = require("express");
const sendError = require("../Functions/customError");
const { hashPassword } = require("../Functions/genratePasswordHash");
const userModel = require("../models/userModel");


module.exports.ensureUniqueUserName = async (req, res) => {
    try {
        const username = req.params.uname;
        const user = await userModel.findOne({ username });
        if (user)
            res.status(200).json({ err: "username is already taken", success: false });
        else
            res.status(200).json({ success: true, err: false })
    }
    catch (e) {
        res.send(500).json({ err: "server error" });
    }
}

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    try {
        const request = Object.keys(req.body);
        const validRequest = ["name", "email", "password", "username"];
        const isValidRequest = request.every((requested) => validRequest.includes(requested));
        if (!isValidRequest) {
            res.status(400).json({ error: "Invalid Access!" });
            return;
        }
        req.body.password = await hashPassword(req.body.password);
        const userReq = new userModel({ ...req.body });
        await userReq.save();
        const mailed = await userReq.sendVerificationEmail();
        if (mailed) {
            res.status(201).json({ success: true });
        }
        else {
            await userModel.deleteOne({ email: req.body.email })
            res.status(406).json({ success: false, error: "cannot create account" });
        }
    }
    catch (e) {
        sendError(req, res, e);
    }
}

module.exports.verifyEmail = async (req, res) => {
    try {
        const { id, token } = req.query;
        const user = await userModel.findById(id);
        if (user.verified)
            return res.render("ErrorPage");

        if (token !== user.hashed)
            return res.render("ErrorPage");

        await userModel.findByIdAndUpdate(user._id, { $unset: { hashed: 1 }, $set: { verified: true } });
        res.render("emailVerification");
    }
    catch (e) {
        res.render("ErrorPage")
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const request = Object.keys(req.body);
        const validRequest = ["email_user", "password"];
        const isValidRequest = request.every((requested) => validRequest.includes(requested));
        if (!isValidRequest || request.length < 2) {
            res.status(400).send("Invalid Access!");
            return;
        }


        const userReq = await userModel.findByCredentials(req.body);
        if (userReq) {
            const token = await userReq.genrateToken();
            res.cookie('token', token, { httpsOnly: true, });
            res.status(201).json({ success: true, error: false, user: userReq });
        }
        else {
            res.status(406).json({ success: false });
        }
    }
    catch (e) {
        sendError(req, res, e);
    }
}

module.exports.signOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.cookie('token', "", { httpOnly: true });
        res.status(200).json({ message: "sign out successful!", success: true });
    }
    catch (e) {
        res.status(500).json({ error: "error in logging out!" });
    }
}

module.exports.user = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (e) {
        res.status(404).json({ error: "please sign in to acceess this page!" });
    }
}

module.exports.passwordChangeRequest = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).send({ error: "Invalid Access" });
        console.log("hello");
        const result = await userModel.passwordReset(email);
        console.log(result)
        if (result)
            return res.status(201).json({ success: true })
        else
            return res.status(400).json({ error: "not registered" });
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports.resetPasswordpage = async (req, res) => {
    try {
        const { id, token } = req.query;//id and token 
        if (!id || !token)
            return res.render("ErrorPage");
        const user = await userModel.findById(id);
        if (!user.verified || user.hashed !== token)
            return res.render("ErrorPage");

        res.render("forgotPassword", { name: user.name, id: id, token: token })

    }
    catch (e) {

    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const derived = Object.keys(req.body);
        const allowed = ["password", "confirmpassword", "id", "token"];
        if (derived.length === allowed.length && derived.every((item) => allowed.includes(item))) {
            const password = await hashPassword(req.body.password)
            const user = await userModel.findOneAndUpdate({ _id: req.body.id, hash: req.body.hash }, { $unset: { hashed: 1 }, $set: { password } });

            if (user) {
                await user.save()
                return res.redirect("https://srijan450.github.io/best-task-app/sign-in");
            }
        }
        return res.render("ErrorPage");
    } catch (e) {
        console.log(e);
    }
}
// functionalities
module.exports.getUserByUsername = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            res.status(400).json({ error: "invalid request" });
            return;
        }
        const result = await userModel.find({ 'username': { $regex: '^' + search, $options: 'i' }, '_id': { $ne: { _id: req.user._id } }, 'verified': true }).limit(10);
        res.status(200).json({ result });
    } catch (e) {
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports.findFriends = (req, res) => {
    try {
        const friends = req.user.friends;
        const result = [];
        friends.forEach(element => {
            result.push(element.username)
        });
        res.status(200).json({ result })
    } catch (e) {
        res.status(500).json({ error: "internal server error" })
    }
}