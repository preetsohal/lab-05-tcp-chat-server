  'use strict';
  const EE = require('events');
  
  module.exports = function clientPool() {
    this.ee = new EE();
    this.pool = {};

    this.ee.on('register', (socket) => {
      socket.write('Welcome to the chatroom!\n');
      socket.id = Math.floor(Math.random() * 90000) + 10000;
      socket.nickName = 'user_' + Math.floor(Math.random() * 900) + 100;

      socket.on('data', (data) => {
        socket.emit('broadcast', data);
        if (data.toString() == 'END\r\n') {
          console.log('user disconnected from chatroom');
          socket.emit('close');
        }
      });

      socket.on('error', (err) => {
        console.log('error: ' + err);
      });

      socket.on('close', () => {
        delete this.pool[socket.id];
        socket.end();
      });

      socket.on('broadcast', (data) => {
        for (var user in this.pool) {
          this.pool[user].write(socket.nickName + ': ' + data.toString());
        }
        console.log(socket.nickName + ': ' + data.toString());
      });
      this.pool[socket.id] = socket;
    });
  };
