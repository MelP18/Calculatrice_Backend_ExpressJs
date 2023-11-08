var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')
var homeRouter = require('./routes/home')

require('./config/database')//config mongodb


var app = express();

//send in tbe DB
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//acces data
/* app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Headers',"*")
    next()
}); */
const corsOptions = {
    origin: 'https://calculatricemelp.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Si vous avez besoin de prendre en charge les cookies (sessions, authentification, etc.)
    optionsSuccessStatus: 204, // Pour les requêtes OPTIONS sans corps
  };
  
  app.use(cors(corsOptions));


app.use('/', indexRouter);
app.use('/auth', userRouter)
app.use('/home', homeRouter)
module.exports = app;
