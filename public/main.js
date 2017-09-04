var socket = io();

/**
 * @param  {integer} num - Number from 0 to 6
 */
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

$('.checkbox').on('click', function() {
  var date = new Date();
  var day  = numToDate(date.getDay());
  var time = date.toLocaleTimeString();

  socket.emit('updated', day + ', ' + time);
});

socket.on('updated', function(msg) { 
  $('.server-management .stats span').text('Updated: ' + msg);
});

socket.on('user connect', function (msg) {
  showDialog('New user connected', 1000);
});

socket.on('user disconnect', function (msg) {
  console.log('A user has disconnected');
});

/**
 * @param  {string} message - the message to show
 * @param  {integer} time - the length of the timeout
 */
function showDialog(message, time) {
  var dialog = $('<span id="dialog">' + message + '</span>').dialog({
    autoOpen: true,
    show: {
      effect: "fade",
      duration: 600
    },
    hide: {
      effect: "fade",
      duration: 600
    }
  });

  setTimeout(() => dialog.parent().fadeOut({
    duration : 800,
    easing   : 'swing',
    complete : function() { $(this).remove(); }
  }), time);
}

/**
 * Emits a chat message through the socket.
 * @constructor
 * @param str {string} - chat message to send
 */
// function sendChatMessage(str) {
//   socket.emit('chat message', str);
// }