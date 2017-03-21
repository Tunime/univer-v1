//escribimos las dependencia que nesesitamos
//las uales ya seran descargada con npm install
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//con este mandato creaoms nuestra
//aplicacion express si queremos lo inicilizamos
var app = express();

// view engine setup
// configura el directorio de vistas el motor
// utilizado en este moemento es jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//Este bloque configura e inicia algunos comopnentes de exress
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//configuras los objetos estaticos(img,css,js,etc) esta configuracion permite que los archivos 
//estaticos se encuentran en la carpeta public puedan ser accedidos como si estubiera en la raiz
app.use(express.static(path.join(__dirname, 'public')));

//definimos la ruta de la aplicacion
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//linea muy inportate exporta el aquete dela apicrion exress
module.exports = app;
