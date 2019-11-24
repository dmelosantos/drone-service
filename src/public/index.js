const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',
  },
  created() {
    var socket = io();
    socket.on('server message', function(msg){
      console.log(msg)
    });
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('');
    },
  },
});
