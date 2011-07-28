jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/user');
  var $page = $(".page"),
    $body = $('body'),
    $username = $('.username'),
		$input = $body.find('input'),
		$form = $('.releaseSearch'),
		$result = $('.result');

  socket.on('alive', function (data) {
    console.info(data);
    socket.emit('username', {name: $username.text()});
  });

	socket.on('songitar-result', function (d) {
	  console.info("im here");
	  if (d != null){
  	  $result.text(d);
	  }
	});

	$form.bind('submit', function(e) {
		socket.emit('songitar', $input.val());
	});
	
  $('.foo').click(function() {
    socket.emit('foo', 'someone clicked foo');
    return false;
  });
});
