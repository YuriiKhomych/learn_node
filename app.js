var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorial2');

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});
// view engine setup
app.set('views', path.join(__dirname, 'views')); app.set('view engine', 'pug');

// uncomment after placing our favicon in /public 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); app.use(express.static(path.join(__dirname, 'public')));

// Include controllers 
fs.readdirSync(path.join(__dirname, "controllers")).forEach(function (file) {
  if (file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
  }
});

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  var err = new Error('Not Found'); err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page res.status(err.status || 500); res.render('error');
});

module.exports = app;

app.listen(3000, function () {
  console.log('listening on 3000')
})
