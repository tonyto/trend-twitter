jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/user');
  var $page = $(".page"),
    $body = $('body');

  socket.on('news', function (data) {
    console.info(data);
    socket.emit('hello', {my: 'data'});
  });

  $('.foo').click(function() {
    alert('clicked');
    socket.emit('foo', 'someone clicked foo');
    return false;
  });
});
