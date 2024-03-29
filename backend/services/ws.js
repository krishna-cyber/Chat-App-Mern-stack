const ws = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
module.exports = (server) => {
  const wss = new ws.Server({ server });

  const clients = new Set();

  wss.on("connection", (connection, req) => {
    //adding the connection to the set of clients
    clients.add(connection);
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

      //send the message to the receiver
      [...wss.clients].forEach((client) => {
        if (client.id === parsedData.to) {
          client.send(
            JSON.stringify({
              message: {
                sender: parsedData.from,
                receiver: parsedData.to,
                message: parsedData.message,
              },
            })
          );
        }
      });
    });

    //close the connection and delete clients from set
    connection.on("close", () => {
      console.log("connection closed");
      clients.delete(connection);
      console.log(clients);
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
