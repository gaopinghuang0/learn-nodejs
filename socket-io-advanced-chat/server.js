var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


var people = {};
io.on('connection', function(client) {
	client.on('join', function(name) {
		people[client.id] = name;
		client.emit('update', 'You have connected to the server.');
		io.emit('update', name+' has joined the server.')
		io.emit('update-people', people)
	});

	client.on('send', function(msg) {
		io.emit('chat', people[client.id], msg);
	})

	client.on('disconnect', function() {
		io.emit('update', people[client.id] + ' has left the server.')
		delete people[client.id];
		io.emit('update-people', people);
	})
})


http.listen(3000, function() {
    console.log('listening on *:3000');
});