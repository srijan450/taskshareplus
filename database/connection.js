const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@taskappdatabase.a9vi0.mongodb.net/?retryWrites=true&w=majority&appName=TaskAppDataBase`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch((err) => {
    console.log("db conection error", err);
  });
