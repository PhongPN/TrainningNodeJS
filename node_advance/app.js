var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config()
const mongooes = require('mongoose');

var port = 5000;
var indexRouter = require('./routes/index');
var app = express();

mongooes.connect(process.env.MONGOURL,{useNewUrlParser:true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup router
app.use('/', indexRouter);

// catch 404 and forward to error handler
// error handler

app.listen(port,function(){
  console.log("Server listening connect port" + port)
})
module.exports = app;
