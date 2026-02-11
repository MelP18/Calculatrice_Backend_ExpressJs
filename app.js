// var express = require('express');
// const cors = require('cors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var userRouter = require('./routes/user');
// var homeRouter = require('./routes/home');

// require('./config/database');

// var app = express();

// /* =======================
//    CORS (AVANT TOUT)
// ======================= */
// const corsOptions = {
//   origin: 'https://calculatricemelp.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: false,
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // indispensable sur Vercel

// /* =======================
//    Middlewares
// ======================= */
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// /* =======================
//    Routes
// ======================= */
// app.use('/', indexRouter);
// app.use('/auth', userRouter);
// app.use('/home', homeRouter);

// module.exports = app;

var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var homeRouter = require('./routes/home');

const connectDB = require('./config/database'); // <-- import MongoDB

var app = express();

/* =======================
   CORS
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
   Middleware MongoDB
======================= */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: "Erreur DB" });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    await connectDB();
    res.json({ ok: true, message: "MongoDB connecté" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

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
