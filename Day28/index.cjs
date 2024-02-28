const express = require("express");
const http = require("http");
const setupWebSocketServer = require("./setupWebSocketServer");

const app = express();
const server = http.createServer(app);

// Other Express middleware and route handlers

setupWebSocketServer(server, app); // Pass app instance to the setupWebSocketServer function

const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
