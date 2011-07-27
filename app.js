
/**
 * Module dependencies.
 */

var express = require('express'),
  app = express.createServer(),
  io = require("socket.io").listen(app),
  eyes = require('eyes'),
  Tweeter = require('./lib/tweeter').Tweeter;
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);

console.log("Express server listening on port %d in %s mode",	
	app.address().port, app.settings.env);

// socket io

io.sockets.on('connection', function(client) {
  var tweeter = new Tweeter();
	
  client.emit('news', {hello: 'world'});
  console.log('server connected');
  
	client.on('hello', function(message) {
	  console.log(message);
		client.broadcast.emit("hello world");
	});
	
	client.on('foo', function(message) {
    console.log('hey, Ive received something');
    console.log(message);
    client.broadcast.emit('foo: ', message);
  });
  
  client.on('search', function(searchTerm) {
    console.log("searching for: " + searchTerm);
    tweeter.q = null;
    tweeter.q = searchTerm;
    tweeter.search();

		tweeter.on('search result', function (results) {
			if (results){
				console.log(eyes.inspect(results['results']))
				client.broadcast.emit('result', results['results']);
			};
		});
  });

	setInterval(function () {
		console.log("interval ticked")
		if (tweeter.q != null){
			console.log("refreshing tweets")
			client.broadcast.emit('result', tweeter.refresh());
		}
	}, 10000);
});


