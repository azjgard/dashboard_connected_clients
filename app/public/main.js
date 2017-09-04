var socket = io();
var listenForChange = true;

$('.server-toggle').on('change', function () {
  if (listenForChange) {
    var serverNum = $(this).attr('data-server');
    var isOff     = $(this).parent().hasClass('off');

    socket.emit('server toggle', { serverNum, isOff });

    // we set this variable to false because we don't want the socket
    // to emit 'server toggle' when the emitted message arrives
    // at the other clients and triggers the change event again
    listenForChange = false;
  }
});

socket.on('server toggle', function (info) {
  var selector = '.server-toggle[data-server="' + info.serverNum + '"';
  var onOrOff = info.isOff ? 'off' : 'on';

  $(selector).bootstrapToggle(onOrOff);

  // we set this variable to true because we now want the socket
  // to emit 'server toggle' when the current .server-toggle button
  // is clicked
  listenForChange = true;
});

socket.on('user connect', function (msg) {
  showDialog('Another user has connected.', 1000);
});

socket.on('user disconnect', function (msg) {
  console.log('A user has disconnected');
});

/**
 * @param  {string} message - the message to show
 * @param  {integer} time - the length of the timeout
 */
function showDialog(message, time) {
  $('body').append('<div id="dialog">' + message + '</div>');

  $('#dialog').fadeIn(function() {
    setTimeout(function() {
      $('#dialog').fadeOut();
    }, 800);
  });
}

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