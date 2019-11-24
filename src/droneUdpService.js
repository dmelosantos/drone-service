const dgram = require('dgram');
const io = require('socket.io-client');
const logger = require('./logger');

const socket = io('http://localhost:3000');

const PORT = 33333;
const HOST = '127.0.0.1';

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  logger.info(`UDP Server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  logger.info(`${remote.address}:${remote.port} - ${message}`);
  socket.emit('drone message', message.toString());
});

server.bind(PORT, HOST);
