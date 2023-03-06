require("dotenv").config();

//importing modules and libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/simpleRoute");
const helmet = require("helmet");

//making an server instance
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

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
