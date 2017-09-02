var express = require('express');
var path = require('path');
var session=require('express-session');


//配置redisStore并创建链接
var redis=require('redis');
var RedisStore=require('connect-redis')(session);
var client=redis.createClient(6379,"127.0.0.1");


var index = require('./routes/index');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/public',express.static(path.join(__dirname, 'public')));

//session中间件，将session数据存储在redis的内存系统中
app.use(session({
	secret: 'recommand 128 bytes random string',
	resave:true,
	saveUninitialized:true,
	cookie:{},
	store:new RedisStore({client:client})
}));

app.use('/', index);


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

module.exports = app;





