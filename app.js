const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const mongoose = require ('mongoose');
const database = require('./models/database');
const modelUser = require('./models/model-user');
const Todo = require('./models/model-task');
const passportSetup = require('./config/passport-setup');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost/meen', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to mongoDB'));


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
// After logged route
app.get('/logged', function(req, res){
    Todo.find({},function (err, data){
        if (err) throw err;
        res.render("logged", {todos: data});
    });    
});
// Login route

app.listen(3000);
console.log("Listening on port 3000");