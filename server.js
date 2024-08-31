import WebSocket, { WebSocketServer } from "ws";
import { promises as fs } from "fs";

//
const activeUsernames = new Set();

// generates a random username
const randomUsername = async () => {
  try {
    const data = await fs.readFile("./animals.json", "utf8");
    let animals = JSON.parse(data);
    let index = Math.floor(Math.random() * animals.length);
    let username = animals[index];
    //check it's not already taken
    if (activeUsernames.has(username)) {
      randomUsername();
    } else {
      return username;
    }
  } catch (err) {
    console.log("error when reading file:", err);
    return null;
  }
};

const startServer = () => {
  const server = new WebSocketServer({ port: 8080 });
  const activeConnections = new Map();

  // server
  server.on("connection", async function connection(ws, req) {
    // add to active connections
    const ip = req.socket.remoteAddress;

    //generate temporary username
    const username = await randomUsername();
    if (username) {
      console.log("Random username:", username);
    } else {
      console.log("Failed to generate a random username.");
    }

    //set data to active connections
    activeConnections.set(ws, { ip, username });

    const welcomeMessage = `Welcome. Your temporary username is ${username}`;
    ws.send(welcomeMessage);

    // handle errors
    ws.on("error", console.error);

    //receive and broadcast messages from clients
    ws.on("message", function message(data) {
      console.log(req.socket.remoteAddress, " : ", data.toString());

      server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          const sender = activeConnections.get(ws);
          const username = sender.username;
          const message = `${username} : ${data}`;
          client.send(message);
        }
      });
    });

    // client disconnection
    ws.on("close", (ws) => {
      const user = activeConnections.get(ws);
      const ip = user.ip;
      const username = user.username;
      activeConnections.delete(ws);
      activeUsernames.delete(username);
      console.log("\n", ip, "disconnected");
    });
  });
};

export { startServer };
