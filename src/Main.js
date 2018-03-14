import React from 'react';
import openSocket from 'socket.io-client'

const  socket = openSocket('https://firstmw.herokuapp.com');

function subscribeToTimers(cb) {
    socket.on('timer', (timestamp,two) => cb(two, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }
  export { subscribeToTimers };
