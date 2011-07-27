jQuery(document).ready(function($){
  var socket = io.connect('http://localhost/index');
  var $page = $(".page"),
    $form = $('.searchForm'),
    $input = $form.find('input'),
    $result = $page.find('.result'),
    $body = $('body');

  socket.on('news', function (data) {
    console.info(data);
    socket.emit('hello', {my: 'data'});
  });

  socket.on('result', function (tweets) {
	  console.info(tweets);
	  if (tweets != null){
	    $.each(tweets, function (index, value) {
	      $result.append('<p>' + value['text'] + '</p>');
	    });
      
    }
  });

  $('.foo').click(function() {
    alert('clicked');
    socket.emit('foo', 'someone clicked foo');
    return false;
  });
  
  $form.bind('submit', function (e) {
    console.log("searching for: " + $input.val());
    socket.emit('search', $input.val());
  });
});
