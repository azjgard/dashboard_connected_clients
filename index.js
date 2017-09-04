const path = require('path');

const express = require('express');
const app     = express();

const http = require('http').Server(app);
const io   = require('socket.io')(http);

const PAGE_PATH   = path.join(__dirname, 'public/template.html');
const PORT_NUMBER = 3000;

app.use(express.static('public'));

// TODO: move this to a separate file
// Routes
app.get('/', (req, res) => {
  res.sendFile(PAGE_PATH);
});

// TODO: move this to a separate file
// Socket listeners
io.on('connection', socket => {
  console.log('A user has connected.');
  socket.broadcast.emit('user connect');

  socket.on('updated', msg => io.emit('updated', msg));

  // socket.on('chat message', msg => io.emit('chat message', msg));
  // socket.on('disconnect'  , msg => io.emit('user disconnect', msg));
});

http.listen(PORT_NUMBER, () => {
  console.log('Listening on port 3000\n', '--------------');
});