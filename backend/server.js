require("dotenv").config();

//importing modules and libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/simpleRoute");
const helmet = require("helmet");
const morgan = require("morgan");
const ws = require("./services/ws");

//making an server instance
const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
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
    const server = app.listen(process.env.PORT, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });

    ws(server); /*  this is the line that starts the websocket server 
                  and passes the express server instance to it
                  imported from backend\services\ws.js*/
  })
  .catch((err) => {
    console.log(err);
  });
