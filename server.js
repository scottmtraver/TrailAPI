var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var config = require('config');
var sha1 = require('sha1');

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
var connection = config.get('database.connectionString');

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
app.post('/token', function(req, res) {
  if (req.body.username == 'login' && req.body.password == 'ok') {
    res.send({ access_token: "some bs" });
  } else {
    res.status(400).send({ error: "invalid_grant" });
  }
});
//authentication middleware
app.use(function(req, res, next) {
  if (req.headers['authorization'] !== "Bearer some bs") {
    return res.status(401).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
  next();
});

/*
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
*/

//cloudinary!
app.get('/sign_upload', function(req, res) {
  //needs authentication
  var timestamp = req.query.timestamp;
  var sign = sha1('timestamp=' + timestamp + config.get('cloudinary.secret'));

  //TODO MOVE TO CONFIG!!! DO NOT CHECK IN!!!!
  res.json( {
    timestamp: timestamp,
    signature: sign,
    api_key: config.get('cloudinary.apiKey')
  });
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
