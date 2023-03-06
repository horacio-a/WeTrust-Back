var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var cors = require('cors');

require('dotenv').config()
var session = require('express-session')

var ProductoRouter = require('./routes/AdminProductos')
var VentasRouter = require('./routes/AdminVentas')


var indexRouter = require('./routes/index');
var logRouter = require('./routes/login')
var apiRouter = require('./routes/api')
var apiusersRouter = require('./routes/userapi')
var apiShoppingCartRouter = require('./routes/ShoppingCart')
var apiPedidoRouter = require('./routes/Pedidos')
var payRouter = require('./routes/pay')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'JJEmMcW3JFdf2szpH2whf@#2',
  cookie: { maxAge: null},
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) =>{
  try {
    if(req.session.id_usuario){
      next();
    } else{
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error)
  }
}



app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


app.use('/', indexRouter);
app.use('/login', logRouter);
app.use('/productos',secured, ProductoRouter);
app.use('/ventas', VentasRouter);
app.use('/api', cors(), apiRouter);
app.use('/usuarios', cors(), apiusersRouter);
app.use('/cart', cors(), apiShoppingCartRouter);
app.use('/pedidos', cors(), apiPedidoRouter);

app.use('/pay', cors(), payRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
