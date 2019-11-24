var socket = io();
this.socket.on('server message', function(msg){
  console.log(msg)
});
