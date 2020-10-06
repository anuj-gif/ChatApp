var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

connections = [];

server.listen(3000);
console.log('server listening');

app.get('/',function(req,resp){
    resp.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('connected : %s socket ', connections.length);
    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('disconnected : %s socket ',connections.length);
    });
    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg: data}); // raise custon event for clients
    });
});