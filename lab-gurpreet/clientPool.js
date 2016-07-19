const EE = require('events');
const net = require('net');

function clientPool(l){
  this.ee = new EE();
  this.pool ={};
}
