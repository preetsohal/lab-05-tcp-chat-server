'use strict';

const net = require('net');
const ClientPool = require('./lib/clientPool');
let clientPool = new ClientPool();
const server = net.createServer();

server.on('connection', (socket) => {
  clientPool.ee.emit('register', socket);
});

module.exports = server;
    // console.log('connected');
    // socket.write('hello from the server\n');
    // socket.pipe(process.stdout);
    //
    // socket.on('data', function(data) {
    //     clients.forEach(function(client) {
    //         if (client !== socket)
    //             client.write(socket.nickname + '> ' + data.toString());
    //     });
    //         if (data.toString() === 'END\r\n')
    //         socket.end();
    // });
    // socket.on('end', function() {
    //     console.log('disconnected');
    //     clients.splice(clients.indexOf(socket), 1);
    // });
