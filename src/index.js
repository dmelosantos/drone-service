const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const logger = require('./logger');

// Simulated in-memory cache to store drone's that registered on the server and send their information
const inMemoryCache = {};

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  logger.info('a user connected');
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
  socket.on('drone message', (msg) => {
    // here the UDP server has sent a processed message to us
    io.emit('server message', msg);
  });
});

http.listen(3000, () => {
  logger.info('listening on *:3000');
});
