var sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  eyes = require('eyes');

exports.User = User;

function User(_twitter) {
  return _(this).defaults({
    twitter: _twitter
  });
}


_.extend(User.prototype, {
  get: function(name){
    this.twitter.searchUser(name, function(result) {
      console.log("attempting to broadcast message: " + eyes.inspect(result));
			//broadcast search results using socket of eventemitter
    });
  }
});

