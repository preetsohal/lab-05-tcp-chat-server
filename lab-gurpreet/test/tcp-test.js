'use strict';
const net = require('net');
const expect = require('chai').expect;
const server = require('../_server');
const port = 5000;

describe('chat server', function() {
  before(function(done) {
    server.listen(port, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should send some data between clients', function(done) {
    let client1 = net.connect({
      port
    });
    let client2 = net.connect({
      port
    });
    var messages = ['test message', 'Welcome to the chatroom!\n'];
    var toSend = ['test message'];

    client2.on('data', function(data) {
      expect(data.toString()).to.have.string(messages.pop());
      if (toSend.length)
        client1.write(toSend.pop());
      else
        client1.end();

    });
    client1.on('close', function() {
      client2.end();
      expect(messages.length).to.eql(0);
      done();
    });
  });
});
