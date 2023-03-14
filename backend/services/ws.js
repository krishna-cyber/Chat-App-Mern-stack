const ws = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
module.exports = (server) => {
  const wss = new ws.Server({ server });
  wss.on("connection", (connection, req) => {
    const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {});

    //verify the user from cookie
    jwt.verify(cookies.token, process.env.SECRET, (err, decoded) => {
      if (err) {
        connection.close();
      }
      if (decoded) {
        connection.username = decoded.username;
        connection.id = decoded.id;
      }
    });

    //when a new message is received from client
    connection.on("message", async (message) => {
      const parsedData = JSON.parse(message.toString());

      console.log(parsedData);
      const messageDoc = await Message.create({
        sender: parsedData.from,
        receiver: parsedData.to,
        message: parsedData.message,
      });
      console.log(messageDoc);
    });

    //inform all clients about new user when a new user connected to server
    console.log([...wss.clients].map((client) => client.username));
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((client) => {
            return { username: client.username, id: client.id };
          }),
        })
      );
    });
  });
};
