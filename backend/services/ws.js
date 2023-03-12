const ws = require("ws");
const jwt = require("jsonwebtoken");

module.exports = (server) => {
  const wss = new ws.Server({ server });
  wss.on("connection", (connection, req) => {
    const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {});
    jwt.verify(cookies.token, process.env.SECRET, (err, decoded) => {
      if (err) {
        connection.close();
      }
      if (decoded) {
        connection.username = decoded.username;
        connection.id = decoded.id;
      }
    });

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

    connection.send("hello from server");
  });
};
