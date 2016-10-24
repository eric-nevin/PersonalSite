var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('/game', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile('/frontend/index.html', { root: __dirname });
});
app.all('/arbitrage', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile('/frontend/index.html', { root: __dirname });
});
app.all('/documentation', function(req, res) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile('/frontend/index.html', { root: __dirname });
});

var server = app.listen(8000, function(){
    console.log('cool stuff on: 8000');
});