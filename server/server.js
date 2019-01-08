/*
  server.js
  server routing file

  adds a routing for all chat files
*/

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const {IsString} = require('./utils/validation.js');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');

var users = new Users();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('join', (params, callback) => {
      if (!IsString(params.username) || !IsString(params.room)) {
        callback('A username and room name are required');
      }

      socket.join(params.room);

      //leave a room socket.leave(params.room);
      //emiting to rooms.
      //io.emit -> io.to(params.room).emit();
      //socket.braudcast.emit -> socket.braudcast.to(params.room).emit();
      var theUser = users.getUserbyNmae(params.username);
      if (!theUser) {
          users.addUser(socket.id,params.room,params.username);
      }
      else{
        callback('Users name has been taken');
      }


      socket.emit('newChatMessage',generateMessage(10221,'Welcome new user'));
      socket.broadcast.to(params.room).emit('newChatMessage',generateMessage(10221,`${params.username} has joined the room`));
      io.to(params.room).emit('loadUser', users.getUserList(params.room));
      callback();
  });


  //Disconnected from server -on = event, -socket is the io socket object

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('loadUser', users.getUserList(user.room));
      io.to(user.room).emit('newChatMessage', generateMessage(10221, `${user.name} has left the room`));
    }
    console.log('Client disconnected from server');
  });

  //Custom client listener from the socket
  socket.on('createMessage', (newMessage, callback) => {
      //send to all online.
      io.emit('newChatMessage', generateMessage(newMessage.SendToId, newMessage.messageText));
      callback('Your message has been received');
      /*socket.emit('function'{object})
        sends just to me!!
      */
      /*scocket.broadcast.emit('newChatMessage', {
        messageImage: 'The image',
        messageText: newMessage.messageText,
        fromChaterId: newMessage.fromChaterId,
        messageCreatedAt: new Date().getTime()
      });*/
  });

  socket.on('sendMyLocation', (location, callback) => {
    io.emit('newLocationMessage', generateLocationMessage(102201, location.latitude, location.longitude));
  });

  socket.on('getUsers', (room, callback) => {
    io.emit('loadUser', Users.getUserList(room));
  })

});


server.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});
