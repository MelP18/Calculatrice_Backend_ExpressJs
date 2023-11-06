var express = require('express');
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
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'https://calculatricemelp.netlify.app'); // Remplacez par l'URL de votre frontend sur Netlify
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, other-headers-if-needed');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Ajoutez les méthodes que vous utilisez

    // Autorisez les cookies et l'authentification avec les en-têtes CORS
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Répondez aux pré-vérifications CORS avec succès
        res.sendStatus(200);
    } else {
        // Passez à la route suivante
        next();
    }
});


app.use('/', indexRouter);
app.use('/auth', userRouter)
app.use('/home', homeRouter)
module.exports = app;
