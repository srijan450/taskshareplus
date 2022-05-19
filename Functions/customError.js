const userModel = require("../models/userModel");

const sendError = async (req, res, e) => {
    try {
        console.log(e);
        if (e.name === "Error") {
            if (e.message === "email")
                return res.status(404).json({ success: false, error: { email: "email is not registered!" } });
            else if (e.message === "password")
                return res.status(404).json({ success: false, error: { password: "incorrect password!" } });
            else if (e.message === "validation")
                return res.status(404).json({ success: false, error: { email: "your email is not verified!" } });
        }
        if (e.name === 'MongoServerError' && e.code === 11000) {
            const validUser = await userModel.userVerified(req.body.email);
            if (!validUser)
                return res.status(422).send({ error: { email: 'email verification link is sent' }, success: false });
            return res.status(422).send({ error: { email: 'email is already registered!' }, success: false });

        } else {
            const errorOBJ = JSON.parse(JSON.stringify(e));
            const arr = Object.keys(errorOBJ.errors);
            const obj = {};
            arr.forEach(x => {
                obj[x] = errorOBJ.errors[x].message
            });
            res.status(422).json({ error: obj, success: false })
        }
    }
    catch (e) {
        res.status(500).send({ error: "unknown error", success: false })
    }

}

module.exports = sendError;