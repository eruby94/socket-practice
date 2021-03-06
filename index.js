const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let userCount = 0;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	userCount++;
	let userConnectMsg = `user ${userCount} connected`;
	console.log(userConnectMsg);
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
