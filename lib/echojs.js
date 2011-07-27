// http://developer.echonest.com/api/v4/song/search?api_key=N6E4NIOVYMTHNDM8J&format=json&results=1&artist=radiohead&title=karma%20police

var sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  eyes = require('eyes');

exports.Echojs = Echojs;

function Echojs() {
  return _(this).defaults({
    baseurl: 'http://developer.echonest.com/api/v4/',
		apiKey: 'SUPPLY_API_KEY',
		format: 'format=json',
		results: 'results=5'
  });
}

_.extend(Echojs.prototype, {
  apiKey: function(key) {
		this.apiKey = key;
  },

	songSearch: function(q) {
		this.buildUrl(q);
	},
	
	buildUrl: function(q) {
		var url = '';
		url += this.baseurl;
	}
});

