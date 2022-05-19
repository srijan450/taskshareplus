const { Router } = require("express");
const authenticate = require("../authentication/auth");
const { signUp, verifyEmail, signIn, signOut, ensureUniqueUserName, user, passwordChangeRequest, getUserByUsername, findFriends, resetPasswordpage, resetPassword } = require("../Controllers/userController");
const userRoute = Router();

userRoute.get("/ensureuniqueusername/:uname", ensureUniqueUserName);
userRoute.post("/sign-up", signUp);
userRoute.get("/verify-email", verifyEmail);
userRoute.post("/password-change-request", passwordChangeRequest)
userRoute.get("/reset-password", resetPasswordpage)
userRoute.post("/reset-password", resetPassword)
userRoute.post("/sign-in", signIn);
userRoute.get("/sign-out", authenticate, signOut);
userRoute.get("/validate-user", authenticate, user);
userRoute.get("/find-user", authenticate, getUserByUsername);
userRoute.get("/find-friends", authenticate, findFriends);


module.exports = userRoute;