var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");

jsonApi.setConfig({
  protocol: "http",
  hostname: "localhost",
  port: 3001,
  base: "api",
  meta: {
    description: "This block shows up in the root node of every payload"
  }
});

//authentication
jsonApi.authenticate(function(request, callback) {
  // If a "blockMe" header is provided, block access.
  if (request.headers.blockme) return callback("Fail");

  // If a "blockMe" cookie is provided, block access.
  if (request.cookies.blockMe) return callback("Fail");

  return callback();
});


// Load all the resources
fs.readdirSync(path.join(__dirname, "/resources")).filter(function(filename) {
  return /^[a-z].*\.js$/.test(filename);
}).map(function(filename) {
  return path.join(__dirname, "/resources/", filename);
}).forEach(require);


jsonApi.onUncaughtException(function(request, error) {
  var errorDetails = error.stack.split("\n");
  console.error(JSON.stringify({
    request: request,
    error: errorDetails.shift(),
    stack: errorDetails
  }));
});


jsonApi.start();
