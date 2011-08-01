jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/user');
  var $page = $(".page"),
    $body = $('body'),
    $username = $('.username'),
		$artist = $body.find('.artist'),
		$track = $body.find('.track'),
		$result = $body.find('.result');

  socket.on('alive', function (data) {
    console.info(data);
    socket.emit('username', {name: $username.text()});
  });

	socket.on('songitar-result', function (d) {
	  console.info("im here");
	  if (d != null){
			$result.append("<ul>");
			d.forEach(function(item) {
				$result.append("<li>" + item['title'] + "</li>");
			});
  	  $result.append("</ul>");
	  }
	});
	
  $('.find').click(function() {
		socket.emit('songitar', {artist: $artist.val(), track: $track.val()});
		
		$artist.val('');
		$track.val('');		
    return false;
  });
});
