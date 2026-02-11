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

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');

const connectDB = require('./config/database');

const app = express();

/* CORS */
const corsOptions = {
  origin: 'https://calculatricemelp.netlify.app',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* Middlewares Express */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Routes */
app.use('/', indexRouter);
app.use('/auth', userRouter);
app.use('/home', homeRouter);

/* Route test MongoDB */
app.get('/test-db', async (req, res) => {
  try {
    await connectDB();
    res.json({ ok: true, message: "MongoDB connecté" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

function printRoutes(stack, prefix = "") {
  stack.forEach((layer) => {
    if (layer.route) {
      const path = prefix + layer.route.path;
      const methods = Object.keys(layer.route.methods)
        .join(", ")
        .toUpperCase();
      console.log(`${methods}  ${path}`);
    } else if (layer.name === "router" && layer.handle.stack) {
      printRoutes(layer.handle.stack, prefix + (layer.regexp.source
        .replace("\\/?(?=\\/|$)", "")
        .replace("^\\", "")
        .replace("\\/?$", "")
      ));
    }
  });
}

setTimeout(() => {
  console.log("📌 ROUTES ENREGISTRÉES :");
  printRoutes(app._router.stack);
}, 1000);



module.exports = app;
