
/**
 * Module dependencies.
 */

var express = require('express'),
  app = express.createServer(),
  io = require("socket.io").listen(app),
  eyes = require('eyes'),
	sys = require('sys'),
  Tweeter = require('./lib/tweeter').Tweeter,
  User = require('./lib/user').User,
  Twitter = require('twitter'),
  config = require('./config'),
  Echojs = require('./lib/echojs').Echojs;
// Configuration

var twitter = new Twitter({
  consumer_key: config.twitter['consumer_key'],
  consumer_secret: config.twitter['consumer_secret'],
  access_token_key: config.twitter['access_token_key'],
  access_token_secret: config.twitter['access_token_secret']
});

var echonest = new Echojs(config.echonest['key']);

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

app.get('/index', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/user', function(req, res){
  var qs = req.param('q', null);

  res.render('user', {
    title: 'User stats for ' + qs,
    username: qs
  });
});

app.listen(3000);

console.log("Express server listening on port %d in %s mode",	
	app.address().port, app.settings.env);

// socket io

var index = io
  .of('/index')
  .on('connection', function(client) {
  var tweeter = new Tweeter(twitter);
	
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
				console.log(eyes.inspect(results['results']));
				client.broadcast.emit('result', results['results']);
			};
		});
  });

  setInterval(function () {
		console.log("interval ticked");
		if (tweeter.q != null){
			console.log("refreshing tweets");
			client.broadcast.emit('result', tweeter.refresh());
		}
	}, 10000);
});

var user = io
  .of('/user')
  .on('connection', function(client) {
    client.emit('alive', {hello: 'world'});
		//client.emit('songitar-result', 'I have sent something to sonigtar');
    console.log('server connected to user');
    
    var user = new User(twitter);
    
    client.on('hello', function(message) {
      console.log(message);
        client.broadcast.emit("hello world user");
    });
    
    client.on('songitar', function(arg) {
      console.log("****" + arg);
      echonest.q = null;
      echonest.q = arg;
      echonest.songSearch();
    });
    
    echonest.on('search song response', function (searchResponse) {
      console.log("* about to broadcast");
			var jsonResult = JSON.parse(searchResponse);
      client.emit('songitar-result', jsonResult['response']['songs']);
			client.broadcast.emit('songitar-result', jsonResult['response']['songs']);
    });

  });


