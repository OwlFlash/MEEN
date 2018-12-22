const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const mongoose = require ('mongoose');
const database = require('./models/database');
const modelUser = require('./models/model-user');
const Todo = require('./models/model-task');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const passportSetup = require('./config/passport-setup');
const users = require('./routes/users');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

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

// Static files
app.use(express.static('./public'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/users', users);

// Login route
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

// Create new data 
app.post('/logged', urlencodedParser, function (req, res) {
    const newTodo = Todo(req.body).save(function (err, data) {
        if (err) throw err;
        res.json(data);
        console.log(req.body);
    });
});
// Delete data
app.delete('/logged/:item', function (req, res) {
    const query = Todo.find({
        item: req.params.item.replace(/\-/g, " ")
    });
    query.deleteOne(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});
// Do dokonczenia
// // Update data
// app.put('/logged/:item', function (req, res) {
//     const query = Todo.find({
//         item: req.params.item.replace(/\-/g, " ")
//     });
//     Todo.update(query, req.body, function (err, data) {
//         if (err) throw err;
//         res.json(data);
//         console.log(req.body);
//     });
// });
// Register route
app.get('/register', function (req, res) {
    res.render("register");
});


// Login route

app.listen(3000);
console.log("Listening on port 3000");