require("dotenv").config();
//importing modules and libraries

const express = require("express");
const mongoose = require("mongoose");

//making an server instance
const app = express();

//connection to database and server start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`connected to database ${conn.connection.host}`);
    app.listen(process.env.PORT, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
