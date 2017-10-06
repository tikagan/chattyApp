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
    const broadcast = (userCount) => {
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(userCount))
      })
    }

    const userJoinedNotifications = (userCount, ws) => {
      ws.id = uuidv1()
      userCount.wsid = ws.id
      userCount.id = uuidv1()
      userCount.type = 'userJoinedNotification'
      saveUser(userCount)
      broadcast(userCount)
    }

    const userLeftNotifications = (userCount, ws, users) => {
      console.log('usercount as leaving: ', userCount)
      userCount.type = 'userLeftNotification'
      userCount.count = wss.clients.size
      userCount.users = users
      userCount.wsid = ws.id
      userCount.id = uuidv1()
      //need to broadcast the id of the user that left
      broadcast(userCount)
    }

    saveUser = (data) => {
      data.username = 'Anonymous'
      const newuser = Object.assign({}, users)
      newuser[data.wsid] = {
        username: data.username
      }
      users = newuser
      console.log(users)
    }

    // Create the WebSockets server
    const wss = new SocketServer({ server });

    let users = {}

    // Set up a callback that will run when a client connects to the server
    // When a client connects they are assigned a socket, represented by
    // the ws parameter in the callback.

    wss.on('connection', (ws) => {
      let userCount = {
          count: wss.clients.size
      }
      console.log('Client connected');
      userJoinedNotifications(userCount, ws)
      console.log("userCount: ", userCount)

      ws.on('message', (message) =>{
        const msg = JSON.parse(message)
        switch(msg.type) {
          case 'postMessage':
            console.log('recieved message: ', msg)
            msg.type = 'incomingMessage'
            msg.wsid = ws.id
            msg.id = uuidv1()
            break
          case 'postNotification':
            console.log('recieved notification: ', msg)
            msg.type = 'incomingNotification'
            msg.wsid = ws.id
            msg.id = uuidv1()
            break
          default:
            console.log(msg.type)
        }
        broadcast(msg)
        console.log('broadcast: ', msg)
      })
      // Set up a callback for when a client closes the socket. This usually means they closed their browser.
      ws.on('close', () => {
        userLeftNotifications(userCount, ws, users)
        console.log('Client disconnected')
    });
  });
