const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const modelUsers = require('./routes/users');
const mongoose = require ('mongoose');
const database = require('./models/database');
const Todo = require('./models/model-task');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost/meen', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to mongoDB'));
    var db = mongoose.connection;

    //use sessions for tracking logins
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: db
        })
    }));


// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// serve static files from template
app.use(express.static(__dirname + 'public'));

// Static files
app.use(express.static('./public'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', modelUsers);

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Login route
app.get('/', function(req, res){
    res.render("login");
}); 

app.post ('/login',
    passport.authenticate('local'),
    function (req,res) {
        res.redirect('/logged' + req.user.username);
    }); 

// After logged route
app.get('/logged', function(req, res){
    Todo.find({},function (err, data){
        if (err) throw err;
        res.render("logged", {todos: data});
    });    
});

app.listen(3000);
console.log("Listening on port 3000");