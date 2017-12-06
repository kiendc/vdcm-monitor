'use strict';
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1908,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
        res.send('Hello world');
});

app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500).send('Something bad happened!');
        });

http.listen(port);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
