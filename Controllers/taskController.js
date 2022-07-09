const sharingModel = require("../models/sharingModel");
const taskModal = require("../models/taskModal");

module.exports.createTask = async (req, res) => {
    const request = Object.keys(req.body);
    console.log(req.body);
    const validRequest = ["header", "body", "durationTime", "durationDate", "taskIcon", "shared", "sharewith", "createdDate"];

    const isValidRequest = request.every((requested) => validRequest.includes(requested));
    console.log(isValidRequest);
    if (!isValidRequest || !req.body.header || !req.body.createdDate || (req.body.shared ^ req.body.sharewith)) {
        res.status(400).json({ error: "Invalid Access" });
        return;
    }
    console.log("hello1");
    try {
        if (req.body.shared === 'true') {
            const arr = req.body.sharewith.split(",");
            delete req.body.sharewith;
            const friend = [];
            arr.forEach(async element => {
                friend.push({ username: element });
            });
            req.body.sharewith = friend;
            req.user.friends = friend;
            await req.user.save();
        }
        const task = await new taskModal({ ...req.body, owner: req.user._id });
        if (req.file)
            task.taskIcon = req.file.buffer;

        await task.save()
        res.status(201).json({ task });
    }

    catch (e) {
        console.log(e);
        res.status(500).send({ error: e })
    }
}

module.exports.editTask = async (req, res) => {
    const request = Object.keys(req.body);
    console.log(request);
    const validRequest = ["header", "body", "durationTime", "durationDate", "taskIcon", "shared", "sharewith"];

    const isValidRequest = request.every((requested) => validRequest.includes(requested));
    if (!isValidRequest || !req.body.header || (req.body.shared ^ req.body.sharewith)) {
        res.status(400).json({ error: "Invalid Access" });
        return;
    }
    try {
        const { id } = req.params;
        const task = await taskModal.findOne({ _id: id, owner: req.user._id });

        if (!task) {
            res.status(403).json({ error: "You are not allowed to edit others task" });
            return;
        }

        if (task.shared === true && req.body.shared === 'false') {
            task.sharewith = [];
        }

        if (req.body.shared === 'true') {
            const arr = req.body.sharewith.split(",");
            delete req.body.sharewith;
            const friend = [];
            arr.forEach(async element => {
                friend.push({ username: element });
            });
            req.body.sharewith = friend;
            req.user.friends = friend;
            await req.user.save();
        }

        request.forEach((key) => {
            task[key] = req.body[key];
        });

        if (req.file) {
            task.taskIcon = req.file.buffer;
        }

        await task.save()

        res.status(201).json({ task });
    }

    catch (e) {
        console.log(e);
        res.status(500).send({ error: "server error" })
    }
}

module.exports.test = async (req, res) => {
    // console.log(req.params);
    console.log(req.query)
    console.log(req.body);
    res.send("hellow")
}



module.exports.getTaskImage = async (req, res) => {
    try {
        const { _id } = req.params;
        const images = await taskModal.findById({ _id });
        res.set("Content-Type", "image/jpg");
        res.send(images.taskIcon)
    }
    catch (e) {
        res.status(404).json({ error: "not found" });
    }
}

module.exports.getTaskById = async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await taskModal.findOne({ _id, $or: [{ owner: req.user._id }, { "sharewith.username": req.user.username }] });
        if (task)
            res.status(200).json({ task, });
        else
            res.status(404).json({ error: "404! page not found" })
    }
    catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getAllTasks = async (req, res) => {
    try {
        const match = { completed: false, shared: false, pending: false };
        const sort = {};
        if (req.query.completed)
            match.completed = req.query.completed === 'true';
        if (req.query.shared) {
            match.shared = req.query.shared === 'true';
            // Object.assign(match, { "sharewith.username": req.user });
        }
        if (req.query.pending)
            match.pending = req.query.pending === 'true';
        if (req.query.sortby) {
            const part = req.query.sortby.split(":");
            sort[part[0]] = (part[1] === 'desc') ? -1 : 1;
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.status(200).json({ task: req.user.tasks, user: req.user });
    }
    catch (e) {
        res.status(500).send({ error: "Internal server error" });
    }
}

module.exports.getSharedTasks = async (req, res) => {
    try {
        const option = { completed: false, pending: false };
        if (req.query.pending)
            option.pending = (req.query.pending === 'true');
        if (req.query.completed)
            option.completed = (req.query.completed === 'true');
        const task = await taskModal.find({ $and: [{ $or: [{ owner: req.user._id }, { "sharewith.username": req.user.username }] }, { completed: option.completed, pending: option.pending, shared: true }] }).limit(req.body.limit).sort(req.query.sortBy);
        res.status(200).json({ task });
    }
    catch (e) {
        res.status(500).send({ error: "Internal server error" });
    }
}

// module.exports.getTaskCount = async (req, res) => {
//     try {
//         console.log("hello");
//         const option = { completed: false, pending: false, shared: false };
//         if (req.query.pending)
//             option.pending = (req.query.pending === 'true');
//         if (req.query.completed)
//             option.completed = (req.query.completed === 'true');
//         if (req.query.shared)
//             option.shared = (req.query.shared === 'true');
//         const taskCount = await taskModal.find({ $and: [{ $or: [{ owner: req.user._id }, { "sharewith.username": req.user.username }] }, { completed: option.completed, pending: option.pending, shared: option.shared }] }).count();
//         console.log(taskCount);
//         res.status(200).json({ count: taskCount });

//     } catch (e) {
//         res.status(500).send({ error: "Internal server error" });
//     }
// }

module.exports.markAs = async (req, res) => {
    try {
        const { _id } = req.params;
        if (req.query.completed === 'true') {
            const task = await taskModal.findOneAndUpdate({ _id, owner: req.user._id }, { pending: false, completed: true });
            res.status(200).json({ task });
        }
        else if (req.query.pending === 'true') {
            const task = await taskModal.findOneAndUpdate({ _id, owner: req.user._id, completed: false }, { pending: true });
            res.status(200).json({ task });
        }
        else if (req.query.incomplete === 'true') {
            const task = await taskModal.findOneAndUpdate({ _id, owner: req.user._id, completed: true }, { pending: false, completed: false });
            res.status(200).json({ task });
        }
        else
            res.status(200).json({ error: true });
    }
    catch (e) {
        res.status(500).send({ error: "Internal server error" });
    }
}

module.exports.searchByHeader = async (req, res) => {
    try {
        const parameter = { completed: false, pending: false, shared: false };
        parameter.header = new RegExp(`^${req.query.header}`);
        parameter.owner = req.user._id;
        if (req.query.completed)
            parameter.completed = req.query.completed === 'true';
        if (req.query.shared)
            parameter.shared = req.query.shared === 'true';
        if (req.query.pending)
            parameter.pending = req.query.pending === 'true';
        console.log(parameter.header);
        const tasks = await taskModal.find(parameter).sort({ updatedAt: -1 });
        res.status(201).json({ task: tasks });
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await taskModal.deleteOne({ _id: id });
    if (task) { res.status(200).json({ success: true }); return; }
    res.status(403).json({ error: "request denied" })
}