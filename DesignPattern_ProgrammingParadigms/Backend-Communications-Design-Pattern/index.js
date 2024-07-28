const http = require("http");
const WebSocketServer = require("WebSocket").Server;

let connections = []; // 사용자들 

// create a raw http server
// This will help us create the TCP which will then pass to the websocket to do the
const httpserver = http.createServer();

// pass the httpserver to the WebSocketServer library to do all the job
const websocket = new WebSocketServer({ httpServer: httpserver });

// listen on the TCP socket
httpserver.listen(8080, () =>
  console.log("My server is listening on port 8080")
);
