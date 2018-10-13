require('rootpath')();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
require('app_api/models/db');
const fileUpload = require('express-fileupload');

// const index = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

// view engine setup
// app.set('app_api', path.join(__dirname, 'app_api'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//use JWT auth to secure the api
// app.use(jwt());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'app_api')));

app.use('/public', express.static(__dirname + '/public'));
app.use('/api', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());
app.use(fileUpload());
app.use('/upload', express.static(__dirname + '/upload'));
app.post('/upload', (req, res, next) => {
  console.log(req);
  // var imageName = file.fieldname + '-' + datetimestamp + '.' +
  //  file.originalname.split('.')[file.originalname.split('.').length -1];
  console.log('=======')
  var datetimestamp = Date.now(); 
  console.log(datetimestamp + '-' + req.files.image.name);


  let imageFile = req.files.image;
  console.log(imageFile);
  let filename = datetimestamp + '-' + req.files.image.name;
  console.log(filename);
  imageFile.mv(`${__dirname}/upload/${filename}`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `upload/${filename}` });
  });

})
// api routes
app.use('/users', require('./users/users.controller'));

// app.use('/', index);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

app.use(errorHandler);

const port = 4200;

app.listen(port, () => {
  console.log("Server started at port:" + port);
});

module.exports = app;
