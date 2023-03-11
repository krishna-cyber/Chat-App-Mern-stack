const ws = require("ws");

module.exports = (server) => {
  const wss = new ws.Server({ server });
  wss.on("connection", (ws) => {
    console.log(`connected to client`);
  });
};
