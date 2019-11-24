const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const logger = require('./logger');
const droneService = require('./service/drone.service');

// Simulated in-memory cache to store drone's that registered on the server and send their information
const inMemoryCache = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  logger.info('a user connected');
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });

  /**
   * Receive a drone message from the UDP service
   * Store the drone information on inMemoryCache
   * Calculate and process the information and store it
   */
  socket.on('drone message', (msg) => {
    if (msg && msg.includes('|')) {
      const splittedMessage = msg.split('|');
      const id = splittedMessage[0];
      const oldDroneInformation = inMemoryCache[id];
      // process the drone message
      const newDroneInformation = droneService.process(oldDroneInformation, splittedMessage);
      // update cache with new information
      inMemoryCache[id] = newDroneInformation;
      // notify dashboards that a drone has updated
      io.emit('serverChannel', newDroneInformation);
    }
  });
});

http.listen(3000, () => {
  logger.info('listening on *:3000');
});
