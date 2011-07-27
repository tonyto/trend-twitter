var sys = require('sys'),
  util = require('util'),
  _ = require('underscore'),
  eyes = require('eyes'),
  io = require('socket.io');

exports.User = User;

function User(_twitter) {
  return _(this).defaults({
    twitter: _twitter
  });
}

util.inherits(User, io.Socket)

_.extend(User.prototype, {
  get: function(name){
    this.twitter.searchUser(name, function(result) {
      console.log("attempting to broadcast message: " + eyes.inspect(result));
      this.broadcast.emit("user details", result);
    });
  }
});

