var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var homeRouter = require('./routes/home');

require('./config/database');

var app = express();

/* =======================
   CORS (AVANT TOUT)
======================= */
const corsOptions = {
  origin: 'https://calculatricemelp.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // indispensable sur Vercel

/* =======================
   Middlewares
======================= */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* =======================
   Routes
======================= */
app.use('/', indexRouter);
app.use('/auth', userRouter);
app.use('/home', homeRouter);

module.exports = app;
