const PORT = 33333;
const HOST = '127.0.0.1';

const dgram = require('dgram');

const args = process.argv.slice(2);

if (args.length === 1) {
  // to reduce message size we use the pattern
  // drone id|latitude|longitude
  const message = Buffer.from(args[0]);

  const client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, PORT, HOST, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`UDP message sent to ${HOST}:${PORT}`);
    client.close();
  });
} else {
  console.log('Drone Message Argument is required');
}
