const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.78mk3.mongodb.net/task_app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected to database!");
    })
    .catch((err) => {
        console.log(err);
    });