var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");

// Load all the resources
fs.readdirSync(path.join(__dirname, "/resources")).filter(function(filename) {
  return /^[a-z].*\.js$/.test(filename);
}).map(function(filename) {
  return path.join(__dirname, "/resources/", filename);
}).forEach(require);

//test create tables
var sponsorHandler = require("./handlers/sponsorHandler.js");
sponsorHandler.populate();
var venueHandler = require("./handlers/venueHandler.js");
venueHandler.populate();
var raceHandler = require("./handlers/raceHandler.js");
raceHandler.populate();

var pageHandler = require("./handlers/pageHandler.js");
pageHandler.populate();
var cardHandler = require("./handlers/cardHandler.js");
cardHandler.populate();