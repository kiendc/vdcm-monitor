'use strict';
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
        res.send('Hello world');
});

app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500).send('Something bad happened!');
        });


http.listen(port, ip, function () {
						console.log("Server running @ http://" + ip + ":" + port);
						console.log('Socketio version: ' + io.version);
						console.log('expresss version:' + express.version);
});

io.on('connection', function (socket) { // Incoming connections from clients
    // Greet the newcomer
    socket.emit('hello', { greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!' });

    socket.on('ping', function (data) { // ping-event from the client to be respond with pong
        console.log("received ping from client: ", data);
        socket.emit('pong', { id: data.id });
    });
});

