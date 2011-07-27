jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/user');
  var $page = $(".page"),
    $body = $('body'),
    $username = $('.username'),
		$input = $body.find('input'),
		$form = $('.releaseSearch');

  socket.on('alive', function (data) {
    console.info(data);
    socket.emit('username', {name: $username.text()});
  });

	$form.bind('submit', function(e) {
	  alert('clicked');
		socket.emit('songitar', $input.val());
	});

  $('.foo').click(function() {
    alert('clicked');
    socket.emit('foo', 'someone clicked foo');
    return false;
  });
});
