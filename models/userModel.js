const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../Functions/sendMail");
const { v4: uuid4 } = require("uuid");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name is required"],
        lowercase: true,
    },
    username: {
        type: String,
        trim: true,
        required: [true, "username is required"],
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        lowercase: true,
        validate(val) { if (!isEmail(val)) throw new Error("invalid email") },
        unique: [true, "email is already registered"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: 8
    },
    verified: {
        type: Boolean,
        default: false
    },
    hashed: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    friends: [{
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "username is required"]
        }
    }]
});

userSchema.virtual('tasks', {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
});

userSchema.methods.genrateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "123456789");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.userVerified = async function (email) {
    const user = await userModel.findOne({ email });
    return user.verified;
}

userSchema.methods.sendVerificationEmail = async function () {
    const user = this;
    const hash = uuid4()
    user.hashed = hash;
    await user.save();
    const mailed = await sendMail(user.email, `https://best-task-app.herokuapp.com/verify-email?id=${user._id}&token=${hash}`);
    return mailed;
}

userSchema.statics.findByCredentials = async function ({ email_user, password }) {
    const user = await userModel.findOne({ $or: [{ email: email_user }, { username: email_user }] });

    if (!user)
        throw new Error("email");
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw new Error("password");
    if (!user.verified)
        throw new Error("validation");
    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const obj = user.toObject();
    delete obj.password
    delete obj.tokens
    delete obj._id
    return obj;
}
userSchema.statics.passwordReset = async function (email) {
    const user = await userModel.findOne({ email, verified: true });

    if (user) {
        const hash = uuid4();
        user.hashed = hash;
        await user.save();
        const mailed = await sendMail(user.email, `https://best-task-app.herokuapp.com/reset-password?id=${user._id}&token=${hash}`, "Reset Your Password", `Hello ${user.name} \n Please click on following button to go to reset password page.`);
        return true;
    }
    return false;

}


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;