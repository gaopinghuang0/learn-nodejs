var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
	})
})


http.listen(3000, function() {
    console.log('listening on *:3000');
});