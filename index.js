const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/UserRoutes");
require("./database/connection");
require("hbs");
const cookieParser = require("cookie-parser");
const taskRoute = require("./Routes/TaskRoutes");
const bodyparser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();
const options = {
    origin: 'https://srijan450.github.io/best-task-app',
    credentials: true,
    optionSuccessStatus: 200
}


// app.use(express.json());
app.use(cors(options));
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(multer().any())

app.set("view engine", "hbs");
app.use(cookieParser());
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});