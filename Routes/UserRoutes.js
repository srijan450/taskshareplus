const { Router } = require("express");
const multer = require("multer");
const authenticate = require("../authentication/auth");
const {
  signUp,
  verifyEmail,
  signIn,
  signOut,
  ensureUniqueUserName,
  user,
  passwordChangeRequest,
  getUserByUsername,
  findFriends,
  resetPasswordpage,
  resetPassword,
  profileUpload,
  ProfileImage,
  findUserById,
} = require("../Controllers/userController");

const userRoute = Router();
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/))
      cb(new Error("Only Images Are Allowed"));
    cb(undefined, true);
  },
});

userRoute.get("/ensureuniqueusername/:uname", ensureUniqueUserName);
userRoute.post("/sign-up", signUp);
userRoute.get("/verify-email", verifyEmail);
userRoute.post("/password-change-request", passwordChangeRequest);
userRoute.get("/reset-password", resetPasswordpage);
userRoute.post("/reset-password", resetPassword);
userRoute.post("/sign-in", signIn);
userRoute.get("/sign-out", authenticate, signOut);
userRoute.post("/validate-user", authenticate, user);
userRoute.get("/find-user", authenticate, getUserByUsername);
userRoute.get("/find-friends", authenticate, findFriends);
userRoute.post(
  "/profile-upload",
  authenticate,
  upload.single("profileImage"),
  profileUpload
);
userRoute.get("/profile-image/:username", ProfileImage);
userRoute.get("/find-user-by-id", authenticate, findUserById);

module.exports = userRoute;
