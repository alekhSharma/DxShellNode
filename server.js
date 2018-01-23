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
  
     socket.on('OpenOrg',function() {
        
                sfdx.auth.webLogin({
               // setdefaultdevhubusername: true,
               // setalias: 'HubOrg'
                })
                .then(function(data){
                    console.log(data);
                  return sfdx.auth.webLogin();  
                })
                .then(function(){
                  console.log('Source pushed to scratch org');  
                });
    });
  
  
      socket.on('clicked', function() {
        var list_of_orgs = sfdx.org.list();
        list_of_orgs
          .then(function(data){       
                 
                  console.log('inside list');
                   console.log(data);
               
              });
          });

});
