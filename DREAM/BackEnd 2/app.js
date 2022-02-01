var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const evaluateRouter = require("./routes/evaluate-routes")
const accountRouter = require("./routes/accountManagement-routes")
const steeringRouter = require("./routes/steering-routes");
const bodyParser = require('body-parser');

const app = express();
app.listen(5000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use('/login', accountRouter);
app.use("/evaluate/", evaluateRouter);
app.use("/steering/", steeringRouter);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);




// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new HttpError("Route non trovata", 404);
  throw error;
});

// error handler
app.use((error, req, res, next) => {
  
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Errore generico!" });
});



module.exports = app;
