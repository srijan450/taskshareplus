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
    origin: 'http://localhost:3000',
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
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(multer().any())

app.set("view engine", "hbs");
app.use(cookieParser());
app.use(taskRoute);
app.use(userRoute);

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});