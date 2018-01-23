const sfdx = require('sfdx-js').Client.createUsingPath('sfdx')

// options - all options to use for the relevant commands
//   (see sfdx config documentation)
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  
     socket.on('OpenOrg',function() {
    
          sfdx.auth.webLogin().then(function() {
     console.log('done!');
   })

    });

});
