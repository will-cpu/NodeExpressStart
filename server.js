 //how to import in node.js
const app = require('./app');
const http = require('http');

//creating server
const server = http.createServer(app);
console.log("Starting Server")
server.listen("4040");