
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser')
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const csurf = require('csurf');

const app = express();

const routes = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

// Security Middleware
app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
app.use(csurf({
  cookie: {
    //secure: true means cookie can only be ready over an HTTPS connection
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production',
    //hhtpOnly: true means the client cant read the secret via client-side javascript
    httpOnly: true
  }
}));


app.use(routes);

// Serve React Application
// This should come after routes, but before 404 and error handling.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get(/\/(?!api)*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.use(function(_req, _res, next) {
  next(createError(404));
});

app.use(function(err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.clearCookie('token');
  }
  res.json({
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
});

module.exports = app;
