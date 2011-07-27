var sys = require('sys'),
  util = require('util'),
  _ = require('underscore');

exports.User = User;

function User() {
    return _(this).defaults({
        name: ""
    });
}


