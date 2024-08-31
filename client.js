import WebSocket from "ws";
import readline from "readline";

const startClient = () => {
  // cli setup
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //client
  const client = new WebSocket("ws://localhost:8080");

  // open connection
  client.on("open", () => {
    console.log("Connected to server");

    //user input
    rl.setPrompt("Enter a message: ");
    rl.prompt();

    rl.on("line", (input) => {
      client.send(input);
      rl.prompt();
    });
  });

  // from server
  client.on("message", (data) => {
    console.log("\n", data.toString());
    rl.prompt();
  });

  //handle errors
  client.on("error", (error) => {
    console.error("Websocket error:", error);
  });

  //close connection
  client.on("close", () => {
    console.log("\n The server has been closed.");
    // closes the cli
    rl.close();
  });
};

export { startClient };
