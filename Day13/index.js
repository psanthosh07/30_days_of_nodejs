const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

function setupWebSocket(server) {

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);

      ws.send(`Server echoes: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket.html'));
  });

  server.on('request', app);
}

const server = http.createServer();

setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
