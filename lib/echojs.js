// http://developer.echonest.com/api/v4/song/search?api_key=N6E4NIOVYMTHNDM8J&format=json&results=1&artist=radiohead&title=karma%20police

var sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  eyes = require('eyes'),
  http = require('http'),
  events = require('events');
  
String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

exports.Echojs = Echojs;

function Echojs(_apiKey) {
  return _(this).defaults({
    baseurl: 'developer.echonest.com',
		apiKey: _apiKey,
		q: null
  });
}

util.inherits(Echojs, events.EventEmitter);

_.extend(Echojs.prototype, {
	songSearch: function() {
	  var that = this
	  
		var songUrl = this.buildUrl('song/search');
    var httpClient = http.createClient(80, this.baseurl);
    var request = httpClient.request('GET', songUrl, {'host': this.baseurl});
    request.end();
    
    request.on('response', function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        that.emit('search song response', chunk);
      });
    });
		
	},
	
	refresh: function () {
    this.songSearch()
	},
	
	buildUrl: function(method) {
		return "/api/v4/{0}?api_key={1}&format=json&results=5&artist={2}&title={2}".format(method, this.apiKey, this.q)
	}
});

