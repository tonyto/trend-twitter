jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/user');
  var $page = $(".page"),
    $body = $('body'),
    $username = $('.username');

  socket.on('alive', function (data) {
    console.info(data);
    socket.emit('username', {name: $username.text()});
  });

  $('.foo').click(function() {
    alert('clicked');
    socket.emit('foo', 'someone clicked foo');
    return false;
  });
});
