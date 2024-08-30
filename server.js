import WebSocket, { WebSocketServer } from "ws";

const randomUsername = () => {

}

const startServer = () => {
  const server = new WebSocketServer({ port: 8080 });

  const activeConnections = new Map();

  // server
  server.on("connection", function connection(ws, req) {
    // add to active connections
    const ip = req.socket.remoteAddress;
    activeConnections.set(ws, ip);

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
    ws.on("close", (ws) => {
      const ip = activeConnections.get(ws);
      activeConnections.delete(ws);
      console.log("\n", ip, "disconnected");
    });
  });
};

export { startServer };
