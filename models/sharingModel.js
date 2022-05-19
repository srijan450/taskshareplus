const mongoose = require("mongoose");
const sharingSchema = new mongoose.Schema({
    taskID: {
        type: String,
        required: [true, "taskid is required"],
        trim: true
    },
    owner: {
        type: String,
        required: [true, "owner must be specified"],
        trim: true
    },
    sharedWith: [{
        type: String,
        required: [true, "where to share"],
        trim: true
    }]
});

const sharingModel = mongoose.model("shared", sharingSchema);

module.exports = sharingModel;