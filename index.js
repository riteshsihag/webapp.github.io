// NODE SERVER WHICH WILL HANDLE SOCKET IO CONNECTIONS
const io = require('socket.io')(8000 , {
    cors: {
      origin: '*',
    }
  });
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', names =>{
        users[socket.id] = names;
        socket.broadcast.emit('user-joined',names);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('rec', {message: message, names: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
});