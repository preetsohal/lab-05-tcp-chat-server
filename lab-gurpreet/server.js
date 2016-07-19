'use strict';

const net = require('net');


let clients = [];

let server = net.createServer(function(socket) {
  var idNum = randomGen();
  socket.id = 'user-' + idNum;
  socket.nickname = 'guest-' + idNum;
  clients.push(socket);
  console.log(socket.nickname + 'has joined the network');

function randomGen(){
  return Math.floor(Math.random() * (1000  -1) +1);
}

  console.log('connected');
  socket.write('hello from the server\n');
  socket.pipe(process.stdout);

  socket.on('data', function(data) {
    clients.forEach(function(client) {
      if (client !== socket)
        client.write(socket.nickname + '> ' + data.toString());
    });

    if (data.toString() === 'END\r\n')
      socket.end();
  });

  socket.on('end', function() {
    console.log('disconnected');
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(3000, function() {
  console.log('server up');
});
