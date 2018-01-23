const sfdx = require('sfdx-node');

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
  console.log(sfdx);
  
     socket.on('OpenOrg',function spinup() {
        
                sfdx.auth.webLogin({
                setdefaultdevhubusername: true,
                setalias: 'HubOrg'
                })
                .then(function(){
                  //push source
                  return sfdx.source.push();  
                })
                .then(function(){
                  console.log('Source pushed to scratch org');  
                });
    });

});
