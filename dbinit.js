var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");

// Load all the resources
fs.readdirSync(path.join(__dirname, "/resources")).filter(function(filename) {
  return /^[a-z].*\.js$/.test(filename);
}).map(function(filename) {
  return path.join(__dirname, "/resources/", filename);
}).forEach(function (path) {
  var mod = require(path);
  mod.handler.populate();
});