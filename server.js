// load environment variables process.env.NAME
require('dotenv').load();
var jsonApi = require("jsonapi-server");
var fs = require("fs");
var path = require("path");
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sha1 = require('sha1');
var bcrypt = require('bcrypt');
var _ = require('lodash');

const excludePaths = [
  '/api/centry'
];

jsonApi.setConfig({
  protocol: "http",
  hostname: "localhost",
  port: process.env.APP_PORT,
  base: "api",
  meta: {
    description: "This block shows up in the root node of every payload"
  }
});

var appSecret = process.env.APP_SECRET;
var connection = 'postgres://' + process.env.PG_USER + ':' +
  process.env.PG_PASS + '@' + process.env.PG_HOST + ':' + process.env.PG_PORT +
  '/' + process.env.PG_DBNAME;

var sequelize = new Sequelize(connection);

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.TEXT
});

var app = jsonApi.getExpressServer();//get express instance
//configure body parsers
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

//auth token route
app.post('/token', function(req, res) {
    User.findOne({ where: { username: req.body.username } }).then(function (user) {
    if (!user) {
      res.status(400).send({ error: "Username or password is invalid" });
    } else if (user) {
      // check if password matches
      if (!bcrypt.compareSync(req.body.password, user.get('password'))) {
        res.status(400).send({ error: "Username or password is invalid" });
      } else {
        // if user is found and password is right
        var token = jwt.sign(user.dataValues, appSecret, {
          expiresIn: 1440
        });

        res.send({ access_token: token, token_type: 'bearer' });
      }   
    }
  });
});

//cloudinary!
app.get('/sign_upload', function(req, res) {
  //needs authentication
  var timestamp = req.query.timestamp;
  var sign = sha1('timestamp=' + timestamp + process.env.CLOUDINARY_SECRET);

  res.json( {
    timestamp: timestamp,
    signature: sign,
    api_key: process.env.CLOUDINARY_KEY
  });
});

//authentication middleware
app.use(function(req, res, next) {
  // require authentication for all admin actions
  // var isAdmin = req.headers.referer ? req.headers.referer.indexOf('4200') >= 0 : false;
  var isAdmin = req.headers.referer ? req.headers.referer.indexOf('admin') >= 0 : false;
  if (req.method === 'GET' && !(isAdmin)) {
    next();
    return;
  }
  // exclude certain routes
  if (_.includes(excludePaths, req.path)) {
    next();
    return;
  }
  var token = (req.headers['authorization'] || '').split(' ')[1];
  jwt.verify(token, appSecret, function(err, decoded) {
    if (err) {
      return res.status(401).send({ 
          success: false, 
          message: err 
      });
    } else {
      next();
    }
  });
});

//file upload
app.post('/api/results', function(req, res) {

  var base64 = require('file-base64');
  var content = '';
  req.on('data', function(buf) { content += buf.toString(); });
  req.on('end', function() {
    content = content.replace(/"/g,"");
    var test = content.substr(0, 22);
    //check for text/html header
    if(test === 'data:text/html;base64,') {
      var trim = content.slice(22);
      var filename = 'uploads/results_' + new Date().getTime() + '.html';
      base64.decode(trim, filename, function(err, output) {
        res.json( {
          url: '/' + filename,
        });
      });
    } else {
      res.json( {
        error: 'Invalid Upload',
        url: '',
      });
    }
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
