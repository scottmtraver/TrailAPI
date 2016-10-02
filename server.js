var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var config = require('config');

jsonApi.setConfig({
  protocol: "http",
  hostname: "localhost",
  port: 3001,
  base: "api",
  meta: {
    description: "This block shows up in the root node of every payload"
  }
});

var appSecret = config.get('app.secret');
var connection = config.get('database.config.connectionString');

var sequelize = new Sequelize(connection);

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.TEXT
})


var app = jsonApi.getExpressServer();//get express instance
//configure body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//auth token route
app.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({ where: { username: req.body.username } }).then(function (user) {
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.get('password') != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        var token = jwt.sign(user.dataValues, appSecret, {
          expiresIn: 1440
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});

// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, appSecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
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


//close squelize
