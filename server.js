var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });


  // server.js

  const express = require('express');
  const SocketServer = require('ws').Server;
  const uuidv1 = require('uuid/v1');

  // Set the port to 3001
  const PORT = 3001;

  // Create a new express server
  const server = express()
     // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

    //broadcast function
    const broadcast = (msg) => {
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(msg))
      })
    }

    const userJoinedNotifications = (users) => {
      users.id = uuidv1()
      users.content = 'Anonymous has joined the chat.'
      users.count ++
      users.type = 'userJoinedNotification'
      broadcast(users)
    }

    const userLeftNotifications = (users) => {
      users.id = uuidv1()
      type: 'userLeftNotification'
      users.count --
    }

    // Create the WebSockets server
    const wss = new SocketServer({ server });

    // Set up a callback that will run when a client connects to the server
    // When a client connects they are assigned a socket, represented by
    // the ws parameter in the callback.
    let users = {
      count: 0
    }
    wss.on('connection', (ws) => {
      console.log('Client connected');
      userJoinedNotifications(users)
      console.log("users: ", users)

      ws.on('message', (message) =>{
        const msg = JSON.parse(message)
        msg.id = uuidv1()
        switch(msg.type) {
          case 'postMessage':
            console.log('recieved message: ', msg)
            msg.type = 'incomingMessage'
            break
          case 'postNotification':
            console.log('recieved notification: ', msg)
            msg.type = 'incomingNotification'
            break
          default:
            console.log(msg.type)
        }
        broadcast(msg)
      })
      // Set up a callback for when a client closes the socket. This usually means they closed their browser.
      ws.on('close', () => {
        console.log('Client disconnected')
        userLeftNotifications(users)
    });
  });
