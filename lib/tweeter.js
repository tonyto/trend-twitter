var Twitter = require('twitter'),
  sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  events = require('events'),
  eyes = require('eyes');

exports.Tweeter = Tweeter;

function Tweeter(_twitter) {
  events.EventEmitter.call(this);
  
  return _(this).defaults({
    twitter: _twitter,
    tweets: [],
    search_terms: [],
		q: null
  });
};

util.inherits(Tweeter, events.EventEmitter);

_.extend(Tweeter.prototype, {
  search: function() {
    var that = this;
    console.log("tweeter search term: " + this.q);
    this.twitter.search(this.q, function(result) {
      //console.log(eyes.inspect(result));
      that.emit('search result', result);
    });
  },
	
	refresh: function() {
		this.search(this.q);
	}
});
