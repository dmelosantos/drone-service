const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const logger = require('./logger');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  logger.info('a user connected');
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
  socket.on('drone message', (msg) => {
    logger.warn(`message: ${msg}`);
  });
});

http.listen(3000, () => {
  logger.info('listening on *:3000');
});
