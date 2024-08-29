import WebSocket, { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

const activeConnections = [];

const addConnection = (ip) => {
  if (!activeConnections.includes(ip)) {
    activeConnections.push(ip);
  }
};

const removeConnection = (ip) => {
  if (activeConnections.includes(ip)) {
    addConnection = activeConnections.filter((item) => item != ip);
  }
};

// server
server.on("connection", function connection(ws, req) {

    // add to active connections 
  addConnection(req.socket.remoteAddress);

    // handle errors
  ws.on("error", console.error);

    //receive and broadcast messages from clients
  ws.on("message", function message(data) {
    console.log(req.socket.remoteAddress, " : ", data.toString());

    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(data);
      }
    });
  });

    // client disconnection
  ws.on("close", (ws, req) => {
    ip = req.socket.remoteAddress
    removeConnection(ip);
    console.log("\n", ip, "disconnected");
  });
});
