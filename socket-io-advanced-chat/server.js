var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var Room = require('./room.js');
var uuid = require('node-uuid');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


var people = {};
var rooms = {};
var clients = [];
io.on('connection', function(client) {
    client.on('join', function(name) {
        roomID = null;
        people[client.id] = {"name": name, 'room': roomID};
        client.emit('update', 'You have connected to the server.');
        io.emit('update', name+' is online.')
        io.emit('update-people', people)
        client.emit('roomList', {rooms: rooms});
        clients.push(client);
    });

    client.on('send', function(msg) {
        if (io.manager.roomClients[client.id]['/'+client.room] !== undefined ) {
            io.in(client.room).emit("chat", people[client.id], msg);
        } else {
            client.emit("update", "Please connect to a room.");
        }
    })

    client.on("createRoom", function(name) {  
        if (people[client.id].room === null) {
            var id = uuid.v4();
            var room = new Room(name, id, client.id);
            rooms[id] = room;
            io.emit("roomList", {rooms: rooms}); //update the list of rooms on the frontend
            client.room = name; //name the room
            client.join(client.room); //auto-join the creator to the room
            room.addPerson(client.id); //also add the person to the room object
            people[client.id].room = id; //update the room key with the ID of the created room
        } else {
            // FIXME: using io.emit??? not client.emit???
            io.emit("update", "You have already created a room.");
        }
    });

    client.on("joinRoom", function(id) {  
        var room = rooms[id];
        if (client.id === room.owner) {
            client.emit("update", "You are the owner of this room and you have already been joined.");
        } else {
            room.people.contains(client.id, function(found) {
              if (found) {
                  client.emit("update", "You have already joined this room.");
              } else {
                    if (people[client.id].inroom !== null) { //make sure that one person joins one room at a time
                      client.emit("update", "You are already in a room ("+rooms[people[client.id].inroom].name+"), please leave it first to join another room.");
                  } else {
                      room.addPerson(client.id);
                      people[client.id].inroom = id;
                        console.log(io.manager.roomClients[client.id]); //should return { '': true }  
                        client.room = 'myroom';  
                        client.join('myroom');  
                        console.log(io.manager.roomClients[client.id]); //shou
                      client.room = room.name;
                      client.join(client.room); //add person to the room
                      user = people[client.id];
                      io.in(client.room).emit("update", user.name + " has connected to " + room.name + " room.");
                      client.emit("update", "Welcome to " + room.name + ".");
                      client.emit("sendRoomID", {id: id});
                  }
              }
          });
        }
    });

    client.on("leaveRoom", function(id) {  
      var room = rooms[id];
      if (client.id === room.owner) {
        var i = 0;
        while(i < clients.length) {
          if(clients[i].id == room.people[i]) {
            people[clients[i].id].inroom = null;
            clients[i].leave(room.name);
          }
          ++i;
        }
        delete rooms[id];
        people[room.owner].owns = null; //reset the owns object to null so new room can be added
        io.emit("roomList", {rooms: rooms});
        io.in(client.room).emit("update", "The owner (" +user.name + ") is leaving the room. The room is removed.");
      } else {
          room.people.contains(client.id, function(found) {
            if (found) { //make sure that the client is in fact part of this room
              var personIndex = room.people.indexOf(client.id);
              room.people.splice(personIndex, 1);
              io.emit("update", people[client.id].name + " has left the room.");
              client.leave(room.name);
            }
         });
       }
    });

    client.on("removeRoom", function(id) {  
        var room = rooms[id];
        if (room) {
          if (client.id === room.owner) { //only the owner can remove the room
            var personCount = room.people.length;
            if (personCount > 2) {
              console.log('there are still people in the room warning'); //This will be handled later
            }  else {
              if (client.id === room.owner) {
                io.in(client.room).emit("update", "The owner (" +people[client.id].name + ") removed the room.");
                var i = 0;
                while(i < clients.length) {
                  if(clients[i].id === room.people[i]) {
                    people[clients[i].id].inroom = null;
                    clients[i].leave(room.name);
                  }
                    ++i;
                }
                    delete rooms[id];
                    people[room.owner].owns = null;
                io.emit("roomList", {rooms: rooms});

              }
            }
          } else {
            client.emit("update", "Only the owner can remove a room.");
          }
        }
    });

    client.on("disconnect", function() {  
        if (people[client.id]) {
          if (people[client.id].inroom === null) {
            io.emit("update", people[client.id].name + " has left the server.");
            delete people[client.id];
            io.emit("update-people", people);
          } else {
            if (people[client.id].owns !== null) {
              var room= rooms[people[client.id].owns];
              if (client.id === room.owner) {
                var i = 0;
                while(i < clients.length) {
                  if (clients[i].id === room.people[i]) {
                    people[clients[i].id].inroom = null;
                    clients[i].leave(room.name);
                  }
                      ++i;
                }
                delete rooms[people[client.id].owns];
              }
            }
            io.emit("update", people[client.id].name + " has left the server.");
            delete people[client.id];
            io.emit("update-people", people);
            io.emit("roomList", {rooms: rooms});
          }
        }
      });
})

Array.prototype.contains = function(k, callback) {  
    var self = this;
    return (function check(i) {
        if (i >= self.length) {
            return callback(false);
        }
        if (self[i] === k) {
            return callback(true);
        }
        return process.nextTick(check.bind(null, i+1));
    }(0));
};

http.listen(3000, function() {
    console.log('listening on *:3000');
});