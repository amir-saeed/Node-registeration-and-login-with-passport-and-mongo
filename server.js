var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");
var config = require('./config/index');
var logger  = require('./log/index');

// Mongo DB connection
mongoose.connect(config.dbUri);
var db = mongoose.connection;

logger.info('Connected Successfully');

// Routes

var routes = require("./routes/index");
var users = require("./routes/users");

// Initialized app
var app = express();

logger.info('app initialized');

// view engline
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: 'layout'}));
app.set('view engline', 'handlebars');

logger.info('view engine: handlebar is set');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

logger.info('middleware is set');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

logger.info('static folder is set');

// express session handler
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// express - validator code
// In this example, the formParam value is going to get morphed into form body format useful for printing. 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
});

app.use("/", routes);
app.use("/users", users);

// set the server port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('Server is started on port: ' + app.get('port'));
});