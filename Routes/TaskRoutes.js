const { Router } = require("express");
const { getTasks, createTask, getTaskImage, getTaskById, getAllTasks, markAs, searchByHeader, editTask, test } = require("../Controllers/taskController");
const multer = require("multer");
const authenticate = require("../authentication/auth");

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            cb(new Error("Only Images Are Allowed"));
        cb(undefined, true);
    }
});

const taskRoute = Router();
taskRoute.post("/create-task", authenticate, upload.single("taskIcon"), createTask);
taskRoute.get("/taskimage/:_id", authenticate, getTaskImage);
taskRoute.get("/task/:id", authenticate, getTaskById);
taskRoute.patch("/task/:id", authenticate, upload.single("taskIcon"), editTask);
taskRoute.get("/task", authenticate, getAllTasks);
taskRoute.get("/task/mark-as/:_id", authenticate, markAs);
taskRoute.get("/search-by-heading", authenticate, searchByHeader);

module.exports = taskRoute;