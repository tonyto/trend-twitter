var Twitter = require('twitter'),
  sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  events = require('events'),
  eyes = require('eyes'),
  twitter;

twitter = new Twitter({
  consumer_key: 'nJxmdNxhJgYw03CdYvHlw',
  consumer_secret: '4NZhSiaRRDKhhSMJu984vVMSKquXz8yDFhkrYOt6hg',
  access_token_key: '21849675-iplIt7M3e27ZrZvTYPGIgwHxhcnlr9tIqRCJ3gPl6',
  access_token_secret: 'G8C0DVzwanrGZI3L91c2pZV1nlS3uJ1DHfyBnmfw'
})

exports.Tweeter = Tweeter;

function Tweeter() {
  events.EventEmitter.call(this);
  
  return _(this).defaults({
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
    twitter.search(this.q, function(result) {
      //console.log(eyes.inspect(result));
      that.emit('search result', result);
    });
  },
	
	refresh: function() {
		this.search(this.q);
	}
});
