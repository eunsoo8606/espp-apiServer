
var app = require('./app');
var http = require('http');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
// const dotenv = require('dotenv');
// dotenv.config();
/**
 * Get port from environment and store in Express.
 */

app.set('port', PORT);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT,"0.0.0.0",()=>{
  console.log(`${PORT} listen...`)
});
