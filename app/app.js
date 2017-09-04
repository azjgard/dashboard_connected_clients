const path = require('path');

const express = require('express');
const app     = express();

const http = require('http').Server(app);
const io   = require('socket.io')(http);

const PAGE_PATH   = path.join(__dirname, 'public/template.html');
const PORT_NUMBER = 3000;

function getLastAccessed(date) {
  let day  = numToDate(date.getDay());
  let time = date.toLocaleTimeString();

  return `${day}, ${time}`;
}

function numToDate(num) {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][num];
}

let last_accessed = 'never';

app.use(express.static('public'));
app.set('view engine', 'pug');

// TODO: move this to a separate file
// Routes
app.get('/', (req, res) => {
  res.render('index', {
    last_accessed
  });
});

// TODO: move this to a separate file
// Socket listeners
io.on('connection', socket => {
  console.log('A user has connected.');

  socket.broadcast.emit('user connect');

  socket.on('disconnect', msg => {
    last_accessed = getLastAccessed(new Date());
  });

  socket.on('server toggle', info => {
    socket.broadcast.emit('server toggle', info);
  });
});

http.listen(PORT_NUMBER, () => {
  console.log('Listening on port 3000\n', '--------------');
});