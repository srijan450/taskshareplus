const { text } = require("express");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    header: {
        type: String,
        trim: true,
        required: [true, "header is required!"]
    },
    body: {
        type: String,
        trim: true
    },
    pending: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        required: true
    },
    durationDate: {
        type: Date,
    },
    durationTime: {
        type: String,
        trim: true
    },
    taskIcon: {
        type: Buffer,
    },
    shared: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "User"
    },
    sharewith: [
        {
            username: {
                type: String,
                trim: true,
                sparse: true
            }
        }
    ]
}, {
    timestamps: true
});

taskSchema.methods.toJSON = function () {
    const task = this;
    const obj = task.toObject();
    delete obj.__v;
    return obj;
}


const taskModal = mongoose.model('Task', taskSchema);

module.exports = taskModal;