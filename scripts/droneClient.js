const PORT = 33333;
const HOST = '127.0.0.1';

const dgram = require('dgram');

// to reduce message size we use the pattern
// drone id|latitude|longitude
const message = Buffer.from('D5|-30.131288|-44.885727');

const client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`UDP message sent to ${HOST}:${PORT}`);
  client.close();
});
