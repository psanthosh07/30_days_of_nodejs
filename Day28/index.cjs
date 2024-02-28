const WebSocket = require("ws");

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function connection(ws) {
    console.log("New WebSocket connection established");

    ws.on("message", function incoming(message) {
      console.log("Received message:", message);
      // Handle incoming messages here

      // Example: Broadcast the received message to all connected clients
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
}

module.exports = setupWebSocketServer;
